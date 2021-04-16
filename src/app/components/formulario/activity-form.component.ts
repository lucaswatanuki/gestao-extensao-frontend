import { CursoService } from './../../services/atividade/curso.service';
import { CursoExtensao } from './../../models/curso.model';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Convenio } from 'src/app/models/convenio.model';
import { ConvenioService } from 'src/app/services/atividade/convenio.service';
import { Regencia } from 'src/app/models/regencia.model';

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
  regenciaModel: Regencia;
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
      observacao: [null],
      tipoAtividadeSimultanea: [null, Validators.required]
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
      nivel: [null, Validators.required],
      curso: [null, Validators.required],
      coordenador: [null, Validators.required],
      disciplinaParticipacao: [null, Validators.required],
      cargaHoraTotalMinistrada: [null, Validators.required],
      cargaHorariaTotalDedicada: [null],
      valorBrutoHoraAula: [null, Validators.required],
      valorBrutoTotalAula: [null, Validators.required],
      valorBrutoOutraAtividade: [null, Validators.required],
      instituicao: [null],
      diasTrabalhadosUnicamp: [null],
      diasTrabalhadosOutraInstituicao: [null],
      responsavel: [null, Validators.required],
      unicoDocente: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      totalHorasMinistradas: [null, Validators.required],
      horaSemanal: [null, Validators.required],
      horaMensal: [null, Validators.required],
      observacao: [null]
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

  submeterRegencia(): void {
    this.regenciaModel = new Regencia();
    this.regenciaModel.coordenador = this.regenciaForm.get('coordenador').value;
    this.regenciaModel.nivel = this.regenciaForm.get('nivel').value;
    this.regenciaModel.curso = this.regenciaForm.get('curso').value;
    this.regenciaModel.observacao = this.regenciaForm.get('observacao').value;
    this.regenciaModel.disciplinaParticipacao = this.regenciaForm.get('disciplinaParticipacao').value;
    this.regenciaModel.cargaHoraTotalMinistrada = this.regenciaForm.get('cargaHoraTotalMinistrada').value;
    this.regenciaModel.cargaHorariaTotalDedicada = this.regenciaForm.get('cargaHorariaTotalDedicada').value;
    this.regenciaModel.valorBrutoHoraAula = this.regenciaForm.get('valorBrutoHoraAula').value;
    this.regenciaModel.valorBrutoTotalAula = this.regenciaForm.get('valorBrutoTotalAula').value;
    this.regenciaModel.valorBrutoOutraAtividade = this.regenciaForm.get('valorBrutoOutraAtividade').value;
    this.regenciaModel.dataInicio = this.regenciaForm.get('dataInicio').value;
    this.regenciaModel.dataFim = this.regenciaForm.get('dataFim').value;
    this.regenciaModel.instituicao = this.regenciaForm.get('instituicao').value;
    this.regenciaModel.diasTrabalhadosOutraInstituicao = this.regenciaForm.get('diasTrabalhadosOutraInstituicao').value;
    this.regenciaModel.diasTrabalhadosUnicamp = this.regenciaForm.get('diasTrabalhadosUnicamp').value;
    this.regenciaModel.responsavel = this.regenciaForm.get('responsavel').value;
    this.regenciaModel.unicoDocente = this.regenciaForm.get('unicoDocente').value;
    this.regenciaModel.horaSemanal = this.regenciaForm.get('horaSemanal').value;
    this.regenciaModel.horaMensal = this.regenciaForm.get('horaMensal').value;

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
