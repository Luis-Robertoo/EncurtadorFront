import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Link } from '../../_models/link';
import { ApiService } from '../../_services/api.service';
import { Data } from '../../_models/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private apiService: ApiService
  ){}

  urlOriginal: String = '';
  retorno: Link | undefined;

  encurtar(){
    if(this.urlOriginal.length == 0){
      this.toastr.warning('O link é obrigatório!')
      return;
    }

    this.spinner.show();

    this.apiService.encurtarLink(this.urlOriginal)
      .subscribe((res: Data<Link>) => {
        this.urlOriginal = '';
        this.retorno = res.data;
        this.spinner.hide();

      }, (erro) => {

        this.spinner.hide();
        this.toastr.error(erro.error.message, 'Erro!')

      })
  }
}
