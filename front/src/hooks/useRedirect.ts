import { useRouter } from "next/navigation";

const useRedirect = () => {
    const router = useRouter();
    const redirecting = ( path: string) => {
        router.push(path);
    }
    return{
        redirecting
    }
}
export default useRedirect