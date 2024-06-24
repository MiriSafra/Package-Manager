import { makeAutoObservable } from 'mobx';

interface Package {
    name: string;
    trackingNumber: string;
    collected: boolean;
    lat: number;
    lng: number;
}

class PackageStore {
    packages: Package[] = [];
    filteredPackages: Package[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setPackages(packages: Package[]) {
        this.packages = packages;
        this.filteredPackages = packages;
    }

    setFilteredPackages(filteredPackages: Package[]) {
        this.filteredPackages = filteredPackages;
    }
    get collectedPackagesCount() {
        return this.packages.filter(p => p.collected).length;
      }
      
    toggleCollected(trackingNumber: string) {
       this.packages=this.packages.map(p=>
        p.trackingNumber===trackingNumber?{...p,collected:!p.collected}:p
       );
       this.filteredPackages=this.packages;
    }
    deletePackages(trackingNumber: string){
        this.packages=this.packages.filter(p=>p.trackingNumber!==trackingNumber)
        this.filteredPackages=this.packages;
    }
    addPackage(newPackage:Package){
        this.packages.push(newPackage)
        this.filteredPackages=this.packages;
    }
    filterPackages(showCollected:boolean|null){
        if(showCollected===null){
            this.filteredPackages=this.packages
        }
        else{
            this.filteredPackages=this.packages.filter(p=>
                p.collected===showCollected 
            )
        }
    }
    searchPackages(query:string){
        this.filteredPackages=this.packages.filter(p=>
            p.name.includes(query)||p.trackingNumber.includes(query)
        )
    }

}
const packageStore=new PackageStore();
export default packageStore;