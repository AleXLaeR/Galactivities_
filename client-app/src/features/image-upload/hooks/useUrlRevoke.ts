import { useEffect } from "react";

export default function useUrlRevoke(files: File[]) {
    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        };
    }, [files]);
}