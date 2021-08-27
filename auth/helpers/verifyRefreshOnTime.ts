type Refresh = {
    id: string;
    refresh_token: string;
    expires_in: string;
    user_id: string;
    created_at: string;
};

const verifyRefreshOnTime = (refresh: Refresh) => {
    const currentTime = new Date().getTime();
    if (currentTime > +refresh.expires_in) return false;
    return true;
};

export default verifyRefreshOnTime;
