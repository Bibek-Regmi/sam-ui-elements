export class SDSSelectedItemModelHelper {

    /**
      *  adds an item to the collection
      * if selected mode is single it removes any existing items
      * also checks to see if that item already exists
      * keyfield is used to determine uniqueness of the item added
      * @param itemToAdd 
      * @param keyField 
      * @param selectionMode 
      * @param items 
      */
    public static addItem(itemToAdd: object, keyField: string, selectionMode: SelectionMode, items: object[]) {
        if (!SDSSelectedItemModelHelper.contatinsItem(itemToAdd[keyField], keyField, items)) {
            if (selectionMode === SelectionMode.SINGLE) {
                SDSSelectedItemModelHelper.clearItems(items);
            }
            items.push(itemToAdd);
        }
    }

    /**
     * adds an array of items to the list and will not add duplicate items
     * keyfield is used to determine uniqueness of the item added
     * @param toAddItems 
     * @param keyField 
     * @param selectionMode 
     * @param items 
     */
    public static addItems(toAddItems: object[], keyField: string, selectionMode: SelectionMode, items: object[]) {
        for (let i = 0; i < toAddItems.length; i++) {
            SDSSelectedItemModelHelper.addItem(toAddItems[i], keyField, selectionMode, items);
        }
    }

    /**
     * removes the item from the list
     * keyfield is used to determine uniqueness of the item added
     * @param item 
     * @param keyField 
     * @param items 
     */
    public static removeItem(item: object, keyField: string, items: object[]) {
        if (SDSSelectedItemModelHelper.contatinsItem(item[keyField], keyField, items)) {
            items.splice(items.indexOf(item), 1)
        }
    }

    /**
     * checks to see if a particular item exists by the provied key
     * keyfield is used to determine uniqueness of the item added
     * @param key 
     * @param keyField 
     * @param items 
     */
    public static contatinsItem(key: string, keyField: string, items: object[]): boolean {
        let item = items.find(o => o[keyField] === key);
        return item !== null && item !== undefined;
    }

    /**
     * Clears the list of items
     * @param items 
     */
    public static clearItems(items: object[]) {
        while (items.length > 0) {
            items.pop();
        }
    }

    /**
     * updates an array of items to the list and will not add duplicate items
     * keyfield is used to determine uniqueness of the item added
     * @param selectedItems 
     * @param keyField 
     * @param selectionMode 
     * @param items 
     */
    public static replaceItems(selectedItems: object[], keyField: string, selectionMode: SelectionMode, items: object[]) {
        //Clears Old List
        SDSSelectedItemModelHelper.clearItems(items);
        //Adds new List
        SDSSelectedItemModelHelper.addItems(selectedItems, keyField, selectionMode, items);
    }
}

export enum SelectionMode {
    SINGLE, MULTIPLE
}
