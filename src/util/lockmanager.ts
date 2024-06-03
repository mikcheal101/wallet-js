import AsyncLock from "async-lock";

class LockManager {
    static getLock() {
        return new AsyncLock();
    }
};

export default LockManager;