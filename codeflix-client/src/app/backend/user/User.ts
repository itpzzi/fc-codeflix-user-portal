import { UserProps } from "./types";

export class User {
    public readonly id: string;
    public name: string;
    public email: string;
    public passwordHash: string;
    public isChild: boolean;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.isChild = props.isChild;
    }
}
