import { CursoService } from './../../services/atividade/curso.service';
import { CursoExtensao } from './../../models/curso.model';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Convenio } from 'src/app/models/convenio.model';
import { ConvenioService } from 'src/app/services/atividade/convenio.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit{

  convenioForm: FormGroup;
  cursoForm: FormGroup;
  regenciaForm: FormGroup;
  convenioModel: Convenio;
  cursoModel: CursoExtensao;
  durationInSeconds = 5;

  panelOpenState = false;

  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  ngOnInit(): void {
    this.convenioForm = this.fb.group({
      instituicao: [null, Validators.required],
      projeto: [null, Validators.required],
      coordenador: [null, Validators.required],
      horaSemanal: [null, Validators.required],
      horaMensal: [null, Validators.required],
      descricao: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      valorBruto: [null, Validators.required],
      observacao: [null]
    });

    this.cursoForm = this.fb.group({
      instituicaoVinculada: [null, Validators.required],
      nomeCurso: [null, Validators.required],
      coordenador: [null, Validators.required],
      participacao: [null, Validators.required],
      disciplina: [null],
      totalHorasMinistradas: [null, Validators.required],
      horaSemanal: [null, Validators.required],
      horaMensal: [null, Validators.required],
      valorBrutoHoraAula: [null],
      valorBrutoTotalAula: [null],
      valorBrutoOutraAtividade: [null],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      observacao: [null]
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

  // tslint:disable-next-line: max-line-length
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private convenioService: ConvenioService, private cursoService: CursoService) { }


  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  submeterConvenio(): void {
    console.log(this.convenioForm);
    this.convenioModel = new Convenio();
    this.convenioModel.coordenador = this.convenioForm.get('coordenador').value;
    this.convenioModel.instituicao = this.convenioForm.get('instituicao').value;
    this.convenioModel.descricao = this.convenioForm.get('descricao').value;
    this.convenioModel.horaMensal = this.convenioForm.get('horaMensal').value;
    this.convenioModel.horaSemanal = this.convenioForm.get('horaSemanal').value;
    this.convenioModel.projeto = this.convenioForm.get('projeto').value;
    this.convenioModel.valorBruto = this.convenioForm.get('valorBruto').value;
    this.convenioModel.dataInicio = this.convenioForm.get('dataInicio').value;
    this.convenioModel.dataFim = this.convenioForm.get('dataFim').value;
    this.convenioModel.observacao = this.convenioForm.get('observacao').value;
    this.convenioModel.tipoAtividadeSimultanea = this.convenioForm.get('tipoAtividadeSimultanea').value;

    console.log(this.convenioModel);

    this.convenioService.salvarConvenio(this.convenioModel).subscribe(
      data => {
        this.openSnackBar(data.mensagem, 'OK');
      },
      erro => {
        console.log(erro);
      }
    );
  }

  submeterCurso(): void {
    console.log(this.convenioForm);
    this.cursoModel = new CursoExtensao();
    this.cursoModel.coordenador = this.cursoForm.get('coordenador').value;
    this.cursoModel.nomeCurso = this.cursoForm.get('nomeCurso').value;
    this.cursoModel.participacao = this.cursoForm.get('participacao').value;
    this.cursoModel.observacao = this.cursoForm.get('observacao').value;
    this.cursoModel.disciplinas = this.cursoForm.get('disciplina').value;
    this.cursoModel.cargaHorariaTotal = this.cursoForm.get('totalHorasMinistradas').value;
    this.cursoModel.horaSemanal = this.cursoForm.get('horaSemanal').value;
    this.cursoModel.horaMensal = this.cursoForm.get('horaMensal').value;
    this.cursoModel.valorBrutoHoraAula = this.cursoForm.get('valorBrutoHoraAula').value;
    this.cursoModel.valorBrutoTotalAula = this.cursoForm.get('valorBrutoTotalAula').value;
    this.cursoModel.valorBrutoOutrasAtividade = this.cursoForm.get('valorBrutoOutraAtividade').value;
    this.cursoModel.dataInicio = this.cursoForm.get('dataInicio').value;
    this.cursoModel.dataFim = this.cursoForm.get('dataFim').value;
    this.cursoModel.instituicaoVinculada = this.cursoForm.get('instituicaoVinculada').value;

    console.log(this.convenioModel);

    this.cursoService.salvarCurso(this.cursoModel).subscribe(
      data => {
        this.openSnackBar(data.mensagem, 'OK');
      },
      erro => {
        console.log(erro);
      }
    );
  }
}
