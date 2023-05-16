export default class EasyWorker {
    #private;
    worker: Worker;
    get isWorker(): boolean;
    constructor(url: string, options: {});
    onmessage(fn: {
        (message: any): void;
        (arg0: any): any;
    }): void;
    postMessage(message: any): void;
    terminate(): void;
    onerror(fn: (error: any) => void): void;
    /**
     *
     * @param {*} data
     * @returns {Promise} resolves result onmessage & rejects on error
     */
    once(data: any): Promise<any>;
}
