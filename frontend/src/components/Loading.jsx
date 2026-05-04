import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false });

export default function Loading({ isLoading }) {
    useEffect(() => {
        if (isLoading) {
            NProgress.start();
        } else {
            NProgress.done();
        };
    }, [isLoading]);
};