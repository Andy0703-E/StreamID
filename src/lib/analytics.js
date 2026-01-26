import { supabase } from './supabase';

export const trackPageView = async () => {
    if (typeof window === 'undefined' || !supabase) return;

    // Get or create a simple visitor ID in localStorage
    let visitorId = localStorage.getItem('streamid_visitor_id');
    if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('streamid_visitor_id', visitorId);
    }

    try {
        const { error } = await supabase
            .from('page_views')
            .insert([
                {
                    path: window.location.pathname,
                    visitor_id: visitorId,
                    user_agent: navigator.userAgent,
                    referrer: document.referrer || 'direct'
                }
            ]);

        if (error) {
            // Silently fail if DB not ready yet (e.g. table not created)
            console.warn('Analytics error:', error.message);
        }
    } catch (e) {
        // Silently fail to not interrupt user experience
    }
};
