export class Utility{
    public static getGSProfileObj(allRecords): any{
        let tempObj = {};
        if(allRecords != ""){
            allRecords.every((element) => {
                tempObj[element.email] = element;
            });
        }
        return tempObj;
    }
}