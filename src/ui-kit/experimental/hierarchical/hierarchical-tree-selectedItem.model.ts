export class HierarchicalTreeSelectedItemModel {

    /**
     * Mode of the model either allows a single item or multiple items
     */
    public treeMode: TreeMode = TreeMode.SINGLE;

    /**
     * 
     */
    private items: object[];

    /**
     * 
     */
    constructor() {
        this.items = [];
    }

    /**
     * adds an item to the collection
     * if tree mode is single it removes any existing items
     * also checks to see if that item already exists
     * keyfield is used to determine uniqueness of the item added
     * @param item 
     * @param keyField 
     */
    addItem(item: object, keyField: string) {
        if (!this.contatinsItem(item[keyField], keyField)) {
            if (this.treeMode === TreeMode.SINGLE) {
                this.clearItems();
            }
            this.items.push(item);
        }
    }

    /**
     * adds an array of items to the list and will not add duplicate items
     * keyfield is used to determine uniqueness of the item added
     * @param items 
     * @param keyField 
     */
    addItems(items: object[], keyField: string) {
        for (let i = 0; i < items.length; i++) {
            this.addItem(items[i], keyField);
        }
    }

    /**
     * removes the item from the list
     * keyfield is used to determine uniqueness of the item added
     * @param item 
     * @param keyField 
     */
    removeItem(item: object, keyField: string) {
        if (this.contatinsItem(item[keyField], keyField)) {
            this.items.splice(this.items.indexOf(item), 1)
        }
    }


    /**
     * checks to see if a particular item exists by the provied key
     * keyfield is used to determine uniqueness of the item added
     * @param key 
     * @param keyField 
     */
    contatinsItem(key: string, keyField: string): boolean {
        let item = this.items.find(o => o[keyField] === key);
        return item !== null && item !== undefined;
    }

    /**
     * Clears the list of items
     */
    clearItems() {
        while (this.items.length > 0) {
            this.items.pop();
        }
    }

    /**
     * Gets the list of items
     */
    getItems(): object[] {
        return this.items;
    }
    /**
     * updates an array of items to the list and will not add duplicate items
     * keyfield is used to determine uniqueness of the item added
     * @param items 
     * @param keyField 
     */
    updateItems1(selectedItems: object[], keyField: string, secondarKey: string) {



        

        if (this.items.length > 0 && selectedItems.length > 0)  {
            selectedItems.forEach(item => {
                if (!this.contatinsItem(item[keyField], keyField)) {
                    console.log(item['label']);
                    const modifiedLabel = item['label'];
                    const oldValue = this.items.find(o => o['label'] === modifiedLabel);
                    console.log(oldValue);
                    this.removeItem(oldValue, keyField);
                    console.log(this.items);
                    this.addItem(item, keyField);
                    console.log(this.items);}
                });
    
          
        }
        else {
            this.addItems(selectedItems, keyField);
        }
    }


    updateItems(selectedItems: object[], keyField: string, secondaryField: string) {
        if (this.items.length > 0) {
            selectedItems.forEach(item => {
                if (!this.contatinsItem(item[keyField], keyField)) {
                    const modifiedLabel = item[secondaryField];
                    const oldValue = this.items.find(o => o[secondaryField] === modifiedLabel);
                    this.removeItem(oldValue, keyField);
                    this.addItem(item, keyField);
                }
            })
        }
        else {
            this.addItems(selectedItems, keyField);
        }
    }
}

export enum TreeMode {
    SINGLE, MULTIPLE
}
