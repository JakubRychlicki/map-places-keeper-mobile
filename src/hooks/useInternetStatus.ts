import { useState, useEffect } from "react";
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";

export const useInternetStatus = () => {
    const [reachable, setReachable] = useState(false);
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state:NetInfoState) => {
            setReachable(!!state.isInternetReachable);
          });

        return () => unsubscribe();;
    },[]);

    return reachable;
};