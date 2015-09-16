export interface ISubscription {
    (...args: any[]): void;
}

export interface IDictionary {
    [name: string]: ISubscription[];
}

export class EventEmitter {
    private registry: IDictionary = {};
    dispatchToken: string;//this is specific for flux
    emit(name: string, ...args: any[]) {
        if (!this.registry[name]) return;
        this.registry[name].forEach(x => {
            x.apply(null, args);
        });
    }

    removeListener(name, fn: ISubscription) {
        if (!this.registry[name]) return;
        this.registry[name] = this.registry[name].filter(f=> f != fn);
    }

    addListener(name, fn: ISubscription) {
        if (!this.registry[name]) {
            this.registry[name] = [fn];
        } else {
            this.registry[name].push(fn);
        }
    }
}
