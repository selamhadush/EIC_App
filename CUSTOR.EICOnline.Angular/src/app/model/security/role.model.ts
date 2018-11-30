import { Permission } from './permission.model';

export class Role {
    constructor(name?: string, description?: string, permissions?: Permission[]) {
        this.Name = name;
        this.Description = description;
        this.Permissions = permissions;
    }

    public Id: string;
    public Name: string;
    public Description: string;
    public UsersCount: number;
    public Permissions: Permission[];
}