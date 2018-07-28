import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add-in-gau-chikisha',
  templateUrl: './add-in-gau-chikisha.component.html',
  styleUrls: ['./add-in-gau-chikisha.component.less']
})
export class AddInGauChikishaComponent implements OnInit {

  public homeopathy: any = {
    disease: ""
  };
  public medicineBoxArray: Array<any> = [{
                                          name: '',
                                          description: ''
                                        }];

  constructor(private router: Router,
        private dataService: DataService,
        private zone: NgZone) {

      this.medicineBoxArray = [{
        name: '',
        description: ''
      }];
  }

  ngOnInit() {
    this.dataService.getDiseaseToAddMed().then(diseaseName=>{
      this.homeopathy.disease = diseaseName;
      this.dataService.addMedInDisease("");
    }).catch(err=>{});

  }

  onSubmit(formInput: NgForm){
    let diseaseList:any = {
      disease: formInput.value.disease,
      medicines: []
    };

    for(let i=0; i<this.medicineBoxArray.length; i++){
      let medicineName = formInput.value["name_" + (i+1)];
      let description = formInput.value["description_" + (i+1)];

      if(description && medicineName){
        diseaseList.medicines.push({medicine: medicineName, description: description});
      }else{
        this.dataService.showToast("Please enter medicine name and its descrition");
      }
    }
    this.dataService.addHomeoMedicine(JSON.stringify(diseaseList));
    this.zone.run(()=>{
      formInput.reset();
      this.medicineBoxArray = [{
        name: '',
        description: ''
      }];
    });
  }

  addMedicineBox(formInput: NgForm){
    for(let i=0; i<this.medicineBoxArray.length; i++){
      this.medicineBoxArray[i].name = formInput.value["name_" + (i+1)];
      this.medicineBoxArray[i].description = formInput.value["description_" + (i+1)];
    }
    this.zone.run(()=>{
      this.medicineBoxArray.push({
        name:'',
        description: ''
      });
    });
  }

  removeMedicineRow(index:number){
    this.zone.run(()=>{
      this.medicineBoxArray.splice(index, 1);
    });
  }
  onCancel(){
    this.router.navigate(["/home"], { replaceUrl: true });
  }
}
