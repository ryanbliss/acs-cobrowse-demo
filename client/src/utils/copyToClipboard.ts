export const copyToClipboard = async (value: string): Promise<boolean> => {
    // For older browsers (including T1), this is used instead, but won't work in newer browsers that have deprecated execCommand
    const legacyBrowserCopyToClipboard = (): boolean => {
        try {
            const el = document.createElement("textarea");
            el.value = value;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            return true;
        } catch (error: unknown) {
            return false;
        }
    };
    let didSucceed = false;
    try {
        // Very old browsers don't support navigator.clipboard, so it is best practice to handle it
        if (!navigator.clipboard) {
            throw new Error("Not supported");
        }
        // Not all browsers support this, so we wrap in try/catch
        await navigator.clipboard.writeText(value);
        didSucceed = true;
    } catch {
        didSucceed = legacyBrowserCopyToClipboard();
    }
    return didSucceed;
};
