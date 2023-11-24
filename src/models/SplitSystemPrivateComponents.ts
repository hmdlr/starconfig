/**
 * Generic class to store the components of a system and private components.
 * Can be used for either configurations or rules
 */
export class SplitSystemPrivateComponents<T extends {
  id: string;
  active: boolean;
  official: boolean;
  belongingGroupId: string;
}> {
  inUseSystemComponents: T[];
  inactiveSystemComponents: T[];
  inUsePrivateComponents: T[];
  inactivePrivateComponents: T[];

  constructor(
    inUseSystemComponents?: T[],
    inactiveSystemComponents?: T[],
    inUsePrivateComponents?: T[],
    inactivePrivateComponents?: T[]
  ) {
    this.inUseSystemComponents = inUseSystemComponents || [];
    this.inactiveSystemComponents = inactiveSystemComponents || [];
    this.inUsePrivateComponents = inUsePrivateComponents || [];
    this.inactivePrivateComponents = inactivePrivateComponents || [];
  }

  /**
   * Returns true if there are any components in any of the lists
   */
  public hasComponents(): boolean {
    return this.inUseSystemComponents.length > 0
      || this.inactiveSystemComponents.length > 0
      || this.inUsePrivateComponents.length > 0
      || this.inactivePrivateComponents.length > 0;
  }

  /**
   * Returns the component with the given id, or undefined if it doesn't exist
   * @param id
   */
  public findById(id: string): T | undefined {
    return this.inUseSystemComponents.find(c => c.id === id)
      || this.inactiveSystemComponents.find(c => c.id === id)
      || this.inUsePrivateComponents.find(c => c.id === id)
      || this.inactivePrivateComponents.find(c => c.id === id);
  }

  /**
   * Returns all components in the lists that belong to the given group, and splits them into inUse and inactive
   * @param groupId
   */
  public listFromGroup(groupId: string): {
    inUse: T[],
    inactive: T[]
  } {
    return {
      inUse: [
        ...this.inUseSystemComponents.filter(c => c.belongingGroupId === groupId),
        ...this.inUsePrivateComponents.filter(c => c.belongingGroupId === groupId)
      ],
      inactive: [
        ...this.inactiveSystemComponents.filter(c => c.belongingGroupId === groupId),
        ...this.inactivePrivateComponents.filter(c => c.belongingGroupId === groupId)
      ]
    };
  }

  /**
   * Patches the component with the given id with the given component
   * @param component
   */
  public patch(component: T): void {
    const foundComponent = this.findById(component.id);
    if (foundComponent) {
      Object.assign(foundComponent, component);
    }
  }
}
