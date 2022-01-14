import React, {ComponentType, ReactNode} from 'react';
import Preloader from "../components/common/Preloader";


export const withSuspense=(Component: ComponentType)  =>{
    return ()=><React.Suspense fallback={<Preloader/>}>
            <Component />
        </React.Suspense>
    }
