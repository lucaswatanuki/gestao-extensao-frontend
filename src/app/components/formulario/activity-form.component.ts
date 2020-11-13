import { CursoService } from './../../services/atividade/curso.service';
import { CursoExtensao } from './../../models/curso.model';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Convenio } from 'src/app/models/convenio.model';
import { ConvenioService } from 'src/app/services/atividade/convenio.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent {

  convenioForm: FormGroup;
  cursoForm: FormGroup;
  regenciaForm: FormGroup;
  convenioModel: Convenio;
  cursoModel: CursoExtensao;
  durationInSeconds = 5;

  panelOpenState = false;

  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  ngOnInit() {
    this.convenioForm = this.fb.group({
      instituicao: [null, Validators.required],
      projeto: [null, Validators.required],
      coordenador: [null, Validators.required],
      horaSemanal: [null, Validators.required],
      horaMensal: [null, Validators.required],
      descricao: [null, Validators.required],
      prazo: [null, Validators.required],
      valorBruto: [null, Validators.required],
    });

    this.cursoForm = this.fb.group({
      instituicao: [null, Validators.required],
      projeto: [null, Validators.required],
      coordenador: [null, Validators.required],
      participacao: [null, Validators.required],
      disciplinas: [null, Validators.required],
      cargaHoraTotal: [null, Validators.required],
      valorBrutoHoraAula: [null, Validators.required],
      valorBrutoTotalAula: [null, Validators.required],
      valorBrutoOutrasAtividades: [null, Validators.required],
    });

    this.regenciaForm = this.fb.group({
      company: null,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      address2: null,
      city: [null, Validators.required],
      state: [null, Validators.required],
      postalCode: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      ],
      shipping: ['free', Validators.required]
    });
  }

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private convenioService: ConvenioService,
    private cursoService: CursoService) { }


    openSnackBar(message: string, action: string): void{
      this.snackBar.open(message, action, {
        duration: 5000,
      });
    }

  submeterConvenio(form: FormGroupDirective): void {
    console.log(this.convenioForm);
    this.convenioModel = new Convenio();
    this.convenioModel.coordenador = this.convenioForm.get('coordenador').value;
    this.convenioModel.instituicao = this.convenioForm.get('instituicao').value;
    this.convenioModel.descricao = this.convenioForm.get('descricao').value;
    this.convenioModel.horaMensal = this.convenioForm.get('horaMensal').value;
    this.convenioModel.horaSemanal = this.convenioForm.get('horaSemanal').value;
    this.convenioModel.prazo = this.convenioForm.get('prazo').value;
    this.convenioModel.projeto = this.convenioForm.get('projeto').value;
    this.convenioModel.valorBruto = this.convenioForm.get('valorBruto').value;

    console.log(this.convenioModel);

    this.convenioService.salvarConvenio(this.convenioModel).subscribe(
      data => {
        console.log(data);
        this.form.resetForm();
        this.openSnackBar('Atividade submetida com sucesso!', 'OK');
      },
      erro => {
        console.log(erro);
      }
    );
  }

  submeterCurso(form: FormGroupDirective): void {
    console.log(this.convenioForm);
    this.cursoModel = new CursoExtensao();
    this.cursoModel.coordenador = this.convenioForm.get('coordenador').value;
    this.cursoModel.projeto = this.convenioForm.get('projeto').value;
    console.log(this.convenioModel);

    this.convenioService.salvarConvenio(this.convenioModel).subscribe(
      data => {
        console.log(data);
        this.form.resetForm();
        this.openSnackBar('Atividade submetida com sucesso!', 'OK');
      },
      erro => {
        console.log(erro);
      }
    );
  }
}
