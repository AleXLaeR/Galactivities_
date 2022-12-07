import { useEffect } from "react";
import { useMobXStore } from "app/stores/root.store";

export default function useFetchActivities() {
    const { activityStore: { fetchActivities } } = useMobXStore();

    useEffect(() => {
        fetchActivities().then();
    }, [fetchActivities]);
}