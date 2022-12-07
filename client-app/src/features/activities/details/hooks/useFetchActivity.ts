import { useEffect } from "react";
import { useMobXStore } from "app/stores/root.store";

export default function useFetchActivity(id?: string) {
    const { activityStore: { fetchActivity } } = useMobXStore();
    
    useEffect(() => {
        if (id) {
            fetchActivity(id);
        }
    }, [id, fetchActivity]);
}