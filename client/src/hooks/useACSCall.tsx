import { CallAgent } from "@azure/communication-calling";
import {
    AzureCommunicationCallAdapterArgs,
    CallAdapter,
    StatefulCallClient,
    createAzureCommunicationCallAdapterFromClient,
    createStatefulCallClient,
} from "@azure/communication-react";
import { useEffect, useRef, useState } from "react";

export interface IUseACSCallResults {
    adapter: CallAdapter;
    callAgent: CallAgent;
    callClient: StatefulCallClient;
};

// Example of hook that returns both a CallAdapter and StatefulCallClient
export const useACSCall = (
    args: Partial<AzureCommunicationCallAdapterArgs>,
    afterCreate?: (adapter: CallAdapter) => Promise<CallAdapter>,
    beforeDispose?: (adapter: CallAdapter) => Promise<void>
):
    | IUseACSCallResults
    | undefined => {
    const { credential, locator, userId } = args;
    const displayName = "displayName" in args ? args.displayName : undefined;
    const options = "options" in args ? args.options : undefined;

    // State update needed to rerender the parent component when a new adapter is created.
    const [results, setResults] = useState<IUseACSCallResults | undefined>(undefined);
    // Ref needed for cleanup to access the old adapter created asynchronously.
    const adapterRef = useRef<CallAdapter | undefined>(undefined);

    const afterCreateRef = useRef<
        ((adapter: CallAdapter) => Promise<CallAdapter>) | undefined
    >(undefined);
    const beforeDisposeRef = useRef<
        ((adapter: CallAdapter) => Promise<void>) | undefined
    >(undefined);
    // These refs are updated on *each* render, so that the latest values
    // are used in the `useEffect` closures below.
    // Using a Ref ensures that new values for the callbacks do not trigger the
    // useEffect blocks, and a new adapter creation / distruction is not triggered.
    afterCreateRef.current = afterCreate;
    beforeDisposeRef.current = beforeDispose;

    useEffect(
        () => {
            if (!credential || !locator || !userId || !displayName) {
                return;
            }
            let mounted = true;
            (async () => {
                if (adapterRef.current) {
                    // Dispose the old adapter when a new one is created.
                    //
                    // This clean up function uses `adapterRef` because `adapter` can not be added to the dependency array of
                    // this `useEffect` -- we do not want to trigger a new adapter creation because of the first adapter
                    // creation.
                    if (beforeDisposeRef.current) {
                        await beforeDisposeRef.current(adapterRef.current);
                    }
                    adapterRef.current.dispose();
                    adapterRef.current = undefined;
                }

                let newAdapter: CallAdapter | undefined = undefined;
                // This is just the type check to ensure that displayName is defined.
                if (!displayName) {
                    throw new Error(
                        "Unreachable code, displayName already checked above."
                    );
                }
                if ((options as any)?.roleHint) {
                    throw new Error(
                        "Unreachable code, provided a options without roleHint."
                    );
                }
                const callClient = createStatefulCallClient({
                    userId,
                });
                const callAgent = await callClient.createCallAgent(credential, {
                    displayName,
                });
                newAdapter =
                    await createAzureCommunicationCallAdapterFromClient(
                        callClient,
                        callAgent,
                        locator
                    );

                if (!newAdapter) {
                    throw Error("Unreachable code! Get undefined adapter");
                }

                if (afterCreateRef.current) {
                    newAdapter = await afterCreateRef.current(newAdapter);
                }

                if (!mounted) {
                    beforeDisposeRef.current?.(newAdapter);
                    newAdapter.dispose();
                    return;
                }
                adapterRef.current = newAdapter;
                setResults({
                    callClient,
                    callAgent,
                    adapter: newAdapter,
                });
            })();
            return () => {
                mounted = false;
            }
        },
        // Explicitly list all arguments so that caller doesn't have to memoize the `args` object.
        [
            adapterRef,
            afterCreateRef,
            beforeDisposeRef,
            credential,
            locator,
            userId,
            displayName,
            options,
        ]
    );

    // Dispose any existing adapter when the component unmounts.
    useEffect(() => {
        return () => {
            (async () => {
                if (adapterRef.current) {
                    if (beforeDisposeRef.current) {
                        await beforeDisposeRef.current(adapterRef.current);
                    }
                    adapterRef.current.dispose();
                    adapterRef.current = undefined;
                }
            })();
        };
    }, []);

    // Dispose of the adapter in the window's before unload event.
    // This ensures the service knows the user intentionally left the call if the user
    // closed the browser tab during an active call.
    useEffect(() => {
        const disposeAdapter = (): void => results?.adapter?.dispose();
        window.addEventListener("beforeunload", disposeAdapter);
        return () => window.removeEventListener("beforeunload", disposeAdapter);
    }, [results?.adapter]);

    return results;
};
