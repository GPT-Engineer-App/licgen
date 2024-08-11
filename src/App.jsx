import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5I3DqBZzOhUZjNmjLxZHPPXDXzxBHHUY",
  authDomain: "content-generator-7e5d0.firebaseapp.com",
  projectId: "content-generator-7e5d0",
  storageBucket: "content-generator-7e5d0.appspot.com",
  messagingSenderId: "1037011428840",
  appId: "1:1037011428840:web:a1e9d9f7d8e6c9f1c9c9c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to check Firebase permissions
const checkFirebasePermissions = async () => {
  try {
    // Check Firestore read permission for generatedContent
    const generatedContentCollection = collection(db, 'generatedContent');
    await getDocs(generatedContentCollection);
    console.log('✅ Firestore read permission for generatedContent: OK');
  } catch (error) {
    console.log('❌ Firestore read permission for generatedContent: Failed', error);
  }

  try {
    // Check Firestore write permission for generatedContent
    await addDoc(collection(db, 'generatedContent'), { test: true });
    console.log('✅ Firestore write permission for generatedContent: OK');
  } catch (error) {
    console.log('❌ Firestore write permission for generatedContent: Failed', error);
  }
};

// Run the permission check
checkFirebasePermissions();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
