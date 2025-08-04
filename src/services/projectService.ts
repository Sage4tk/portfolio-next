import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Project, ProjectFormData } from "@/types/project";

const PROJECTS_COLLECTION = "projects";

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(projectsQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(projectsQuery);

    const allProjects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Project[];

    return allProjects.filter((project) => project.featured);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projectDoc = await getDoc(doc(db, PROJECTS_COLLECTION, id));

    if (!projectDoc.exists()) {
      return null;
    }

    return {
      id: projectDoc.id,
      ...projectDoc.data(),
      createdAt: projectDoc.data().createdAt?.toDate(),
      updatedAt: projectDoc.data().updatedAt?.toDate(),
    } as Project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

export async function addProject(
  projectData: ProjectFormData
): Promise<string> {
  try {
    let imageUrl = "";

    // Upload image if provided
    if (projectData.image) {
      const imageRef = ref(
        storage,
        `projects/${Date.now()}_${projectData.image.name}`
      );
      const snapshot = await uploadBytes(imageRef, projectData.image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const now = new Date();
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      title: projectData.title,
      description: projectData.description,
      imageUrl,
      techStack: projectData.techStack,
      featured: projectData.featured,
      liveUrl: projectData.liveUrl || "",
      githubUrl: projectData.githubUrl || "",
      websiteLocation: projectData.websiteLocation || "",
      createdAt: projectData.createdAt ? new Date(projectData.createdAt) : now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

export async function updateProject(
  id: string,
  projectData: Partial<ProjectFormData>
): Promise<void> {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);

    let updateData: any = {
      ...projectData,
      updatedAt: new Date(),
    };

    // Remove image from update data as it needs special handling
    delete updateData.image;

    // Handle createdAt conversion if provided
    if (projectData.createdAt) {
      updateData.createdAt = new Date(projectData.createdAt);
    }

    // Handle image upload if new image provided
    if (projectData.image) {
      const imageRef = ref(
        storage,
        `projects/${Date.now()}_${projectData.image.name}`
      );
      const snapshot = await uploadBytes(imageRef, projectData.image);
      updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(projectRef, updateData);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(
  id: string,
  imageUrl?: string
): Promise<void> {
  try {
    // Delete image from storage if it exists
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch(console.error); // Don't fail if image doesn't exist
    }

    // Delete document from Firestore
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
