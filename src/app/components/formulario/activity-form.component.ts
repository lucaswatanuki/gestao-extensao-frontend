import { CursoService } from './../../services/atividade/curso.service';
import { CursoExtensao } from './../../models/curso.model';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Convenio } from 'src/app/models/convenio.model';
import { ConvenioService } from 'src/app/services/atividade/convenio.service';
import { Regencia } from 'src/app/models/regencia.model';
import { UploadArquivoService } from 'src/app/services/upload/upload-arquivo.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Alocacao } from 'src/app/models/alocacao.model';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef;

  convenioForm: FormGroup;
  cursoForm: FormGroup;
  regenciaForm: FormGroup;
  convenioModel: Convenio;
  cursoModel: CursoExtensao;
  regenciaModel: Regencia;
  durationInSeconds = 5;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  fileAttr = 'Choose File';
  mensagemSucesso = 'Atividade submetida com sucesso!';
  alocacaoExtra = false;
  alocacaoExtra2 = false;
  alocacaoExtra3 = false;
  alocacaoExtra4 = false;
  alocacaoExtra5 = false;

  alocacao: Alocacao;
  alocacao1: Alocacao;
  alocacao2: Alocacao;
  alocacao3: Alocacao;
  alocacao4: Alocacao;
  alocacao5: Alocacao;

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
      ano: [null, Validators.required],
      semestre: [null, Validators.required],
      horasSolicitadas: [null, Validators.required],
      ano1: [null],
      semestre1: [null],
      horasSolicitadas1: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
      ano3: [null],
      semestre3: [null],
      horasSolicitadas3: [null],
      ano4: [null],
      semestre4: [null],
      horasSolicitadas4: [null],
      ano5: [null],
      semestre5: [null],
      horasSolicitadas5: [null],
      tipoAtividadeSimultanea: [null, Validators.required],
      urgente: ['']
    });

    this.cursoForm = this.fb.group({
      instituicaoVinculada: [null, Validators.required],
      nomeCurso: [null, Validators.required],
      coordenador: [null, Validators.required],
      participacao: [null, Validators.required],
      disciplina: [null],
      totalHorasMinistradas: [null, Validators.required],
      valorBrutoHora: [null],
      valorBrutoTotal: [null],
      totalHorasOutrasAtividades: [null],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      observacao: [null],
      ano: [null, Validators.required],
      semestre: [null, Validators.required],
      horasSolicitadas: [null, Validators.required],
      ano1: [null],
      semestre1: [null],
      horasSolicitadas1: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
      ano3: [null],
      semestre3: [null],
      horasSolicitadas3: [null],
      ano4: [null],
      semestre4: [null],
      horasSolicitadas4: [null],
      ano5: [null],
      semestre5: [null],
      horasSolicitadas5: [null],
      urgente: ['']
    });

    this.regenciaForm = this.fb.group({
      nivel: [null, Validators.required],
      curso: [null, Validators.required],
      coordenador: [null, Validators.required],
      disciplinaParticipacao: [null],
      totalHorasMinistradas: [null],
      totalHorasOutrasAtividades: [null, Validators.required],
      valorBrutoHora: [null, Validators.required],
      valorBrutoTotal: [null, Validators.required],
      instituicao: [null, Validators.required],
      diasTrabalhadosUnicamp: [null, Validators.required],
      diasTrabalhadosOutraInstituicao: [null, Validators.required],
      responsavel: [null, Validators.required],
      unicoDocente: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      observacao: [null],
      ano: [null, Validators.required],
      semestre: [null, Validators.required],
      horasSolicitadas: [null, Validators.required],
      ano1: [null],
      semestre1: [null],
      horasSolicitadas1: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
      ano3: [null],
      semestre3: [null],
      horasSolicitadas3: [null],
      ano4: [null],
      semestre4: [null],
      horasSolicitadas4: [null],
      ano5: [null],
      semestre5: [null],
      horasSolicitadas5: [null],
      urgente: ['']
    });
  }

  // tslint:disable-next-line: max-line-length
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private convenioService: ConvenioService, 
    private cursoService: CursoService, 
    private uploadService: UploadArquivoService, private atividadeService: AtividadeService) { }


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
    this.convenioModel.urgente = this.convenioForm.get('urgente').value;
    this.convenioModel.alocacoes = [];
    this.alocacao = new Alocacao();
    this.alocacao.ano = this.convenioForm.get('ano').value;
    this.alocacao.semestre = this.convenioForm.get('semestre').value;
    this.alocacao.horasSolicitadas = this.convenioForm.get('horasSolicitadas').value;
    this.convenioModel.alocacoes.push(this.alocacao);

    if(this.alocacaoExtra) {
      this.alocacao1 = new Alocacao();
      this.alocacao1.ano = this.convenioForm.get('ano1').value;
      this.alocacao1.semestre = this.convenioForm.get('semestre1').value;
      this.alocacao1.horasSolicitadas = this.convenioForm.get('horasSolicitadas1').value;
      this.convenioModel.alocacoes.push(this.alocacao1);
    }

    if(this.alocacaoExtra2) {
      this.alocacao2 = new Alocacao();
      this.alocacao2.ano = this.convenioForm.get('ano2').value;
      this.alocacao2.semestre = this.convenioForm.get('semestre2').value;
      this.alocacao2.horasSolicitadas = this.convenioForm.get('horasSolicitadas2').value;
      this.convenioModel.alocacoes.push(this.alocacao2);
    }

    if(this.alocacaoExtra3) {
      this.alocacao3 = new Alocacao();
      this.alocacao3.ano = this.convenioForm.get('ano3').value;
      this.alocacao3.semestre = this.convenioForm.get('semestre3').value;
      this.alocacao3.horasSolicitadas = this.convenioForm.get('horasSolicitadas3').value;
      this.convenioModel.alocacoes.push(this.alocacao3);
    }

    if(this.alocacaoExtra4) {
      this.alocacao4 = new Alocacao();
      this.alocacao4.ano = this.convenioForm.get('ano4').value;
      this.alocacao4.semestre = this.convenioForm.get('semestre4').value;
      this.alocacao4.horasSolicitadas = this.convenioForm.get('horasSolicitadas4').value;
      this.convenioModel.alocacoes.push(this.alocacao4);
    }

    if(this.alocacaoExtra5) {
      this.alocacao5 = new Alocacao();
      this.alocacao5.ano = this.convenioForm.get('ano5').value;
      this.alocacao5.semestre = this.convenioForm.get('semestre5').value;
      this.alocacao5.horasSolicitadas = this.convenioForm.get('horasSolicitadas5').value;
      this.convenioModel.alocacoes.push(this.alocacao5);
    }

    this.convenioService.salvarConvenio(this.convenioModel).subscribe(
      data => {
        if (this.selectedFiles != null) {
          this.upload(data.id);
        }
        this.openSnackBar(this.mensagemSucesso, 'OK');
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
    this.cursoModel.totalHorasMinistradas = this.cursoForm.get('totalHorasMinistradas').value;
    this.cursoModel.totalHorasOutrasAtividades = this.cursoForm.get('totalHorasOutrasAtividades').value;
    this.cursoModel.valorBrutoHora = this.cursoForm.get('valorBrutoHora').value;
    this.cursoModel.valorBrutoTotal = this.cursoForm.get('valorBrutoTotal').value;
    this.cursoModel.dataInicio = this.cursoForm.get('dataInicio').value;
    this.cursoModel.dataFim = this.cursoForm.get('dataFim').value;
    this.cursoModel.instituicaoVinculada = this.cursoForm.get('instituicaoVinculada').value;
    this.cursoModel.urgente = this.cursoForm.get('urgente').value;

    this.cursoModel.alocacoes = [];

    this.alocacao = new Alocacao();
    this.alocacao.ano = this.cursoForm.get('ano').value;
    this.alocacao.semestre = this.cursoForm.get('semestre').value;
    this.alocacao.horasSolicitadas = this.cursoForm.get('horasSolicitadas').value;
    this.cursoModel.alocacoes.push(this.alocacao);

    if(this.alocacaoExtra) {
      this.alocacao1 = new Alocacao();
      this.alocacao1.ano = this.cursoForm.get('ano1').value;
      this.alocacao1.semestre = this.cursoForm.get('semestre1').value;
      this.alocacao1.horasSolicitadas = this.cursoForm.get('horasSolicitadas1').value;
      this.cursoModel.alocacoes.push(this.alocacao1);
    }

    if(this.alocacaoExtra2) {
      this.alocacao2 = new Alocacao();
      this.alocacao2.ano = this.cursoForm.get('ano2').value;
      this.alocacao2.semestre = this.cursoForm.get('semestre2').value;
      this.alocacao2.horasSolicitadas = this.cursoForm.get('horasSolicitadas2').value;
      this.cursoModel.alocacoes.push(this.alocacao2);
    }

    if(this.alocacaoExtra3) {
      this.alocacao3 = new Alocacao();
      this.alocacao3.ano = this.cursoForm.get('ano3').value;
      this.alocacao3.semestre = this.cursoForm.get('semestre3').value;
      this.alocacao3.horasSolicitadas = this.cursoForm.get('horasSolicitadas3').value;
      this.cursoModel.alocacoes.push(this.alocacao3);
    }

    if(this.alocacaoExtra4) {
      this.alocacao4 = new Alocacao();
      this.alocacao4.ano = this.cursoForm.get('ano4').value;
      this.alocacao4.semestre = this.cursoForm.get('semestre4').value;
      this.alocacao4.horasSolicitadas = this.cursoForm.get('horasSolicitadas4').value;
      this.cursoModel.alocacoes.push(this.alocacao4);
    }

    if(this.alocacaoExtra5) {
      this.alocacao5 = new Alocacao();
      this.alocacao5.ano = this.cursoForm.get('ano5').value;
      this.alocacao5.semestre = this.cursoForm.get('semestre5').value;
      this.alocacao5.horasSolicitadas = this.cursoForm.get('horasSolicitadas5').value;
      this.cursoModel.alocacoes.push(this.alocacao5);
    }

    this.cursoService.salvarCurso(this.cursoModel).subscribe(
      data => {
        if (this.selectedFiles != null) {
          this.upload(data.id);
        }
        this.openSnackBar(this.mensagemSucesso, 'OK');
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
    this.regenciaModel.totalHorasMinistradas = this.regenciaForm.get('totalHorasMinistradas').value;
    this.regenciaModel.totalHorasOutrasAtividades = this.regenciaForm.get('totalHorasOutrasAtividades').value;
    this.regenciaModel.valorBrutoHora = this.regenciaForm.get('valorBrutoHora').value;
    this.regenciaModel.valorBrutoTotal = this.regenciaForm.get('valorBrutoTotal').value;
    this.regenciaModel.dataInicio = this.regenciaForm.get('dataInicio').value;
    this.regenciaModel.dataFim = this.regenciaForm.get('dataFim').value;
    this.regenciaModel.instituicao = this.regenciaForm.get('instituicao').value;
    this.regenciaModel.diasTrabalhadosOutraInstituicao = this.regenciaForm.get('diasTrabalhadosOutraInstituicao').value;
    this.regenciaModel.diasTrabalhadosUnicamp = this.regenciaForm.get('diasTrabalhadosUnicamp').value;
    this.regenciaModel.responsavel = this.regenciaForm.get('responsavel').value;
    this.regenciaModel.unicoDocente = this.regenciaForm.get('unicoDocente').value;
    this.regenciaModel.urgente = this.regenciaForm.get('urgente').value;
    this.regenciaModel.alocacoes = [];

    this.alocacao = new Alocacao();
    this.alocacao.ano = this.regenciaForm.get('ano').value;
    this.alocacao.semestre = this.regenciaForm.get('semestre').value;
    this.alocacao.horasSolicitadas = this.regenciaForm.get('horasSolicitadas').value;
    this.regenciaModel.alocacoes.push(this.alocacao);

    if(this.alocacaoExtra) {
      this.alocacao1 = new Alocacao();
      this.alocacao1.ano = this.regenciaForm.get('ano1').value;
      this.alocacao1.semestre = this.regenciaForm.get('semestre1').value;
      this.alocacao1.horasSolicitadas = this.regenciaForm.get('horasSolicitadas1').value;
      this.regenciaModel.alocacoes.push(this.alocacao1);
    }

    if(this.alocacaoExtra2) {
      this.alocacao2 = new Alocacao();
      this.alocacao2.ano = this.regenciaForm.get('ano2').value;
      this.alocacao2.semestre = this.regenciaForm.get('semestre2').value;
      this.alocacao2.horasSolicitadas = this.regenciaForm.get('horasSolicitadas2').value;
      this.regenciaModel.alocacoes.push(this.alocacao2);
    }

    if(this.alocacaoExtra3) {
      this.alocacao3 = new Alocacao();
      this.alocacao3.ano = this.regenciaForm.get('ano3').value;
      this.alocacao3.semestre = this.regenciaForm.get('semestre3').value;
      this.alocacao3.horasSolicitadas = this.regenciaForm.get('horasSolicitadas3').value;
      this.regenciaModel.alocacoes.push(this.alocacao3);
    }

    if(this.alocacaoExtra4) {
      this.alocacao4 = new Alocacao();
      this.alocacao4.ano = this.regenciaForm.get('ano4').value;
      this.alocacao4.semestre = this.regenciaForm.get('semestre4').value;
      this.alocacao4.horasSolicitadas = this.regenciaForm.get('horasSolicitadas4').value;
      this.regenciaModel.alocacoes.push(this.alocacao4);
    }

    if(this.alocacaoExtra5) {
      this.alocacao5 = new Alocacao();
      this.alocacao5.ano = this.regenciaForm.get('ano5').value;
      this.alocacao5.semestre = this.regenciaForm.get('semestre5').value;
      this.alocacao5.horasSolicitadas = this.regenciaForm.get('horasSolicitadas5').value;
      this.regenciaModel.alocacoes.push(this.alocacao5);
    }

    this.atividadeService.salvarRegencia(this.regenciaModel).subscribe(
      data => {
        if (this.selectedFiles != null) {
          this.upload(data.id);
        }
        this.openSnackBar(this.mensagemSucesso, 'OK');
      },
      erro => {
        this.openSnackBar('Erro ao submeter atividade', 'OK');
        console.log(erro);
      }
    );
  }

  selecionarArquivo(event): void {
    this.selectedFiles = event.target.files;
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  upload(atividadeId: number): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, atividadeId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      },
      err => {
        this.progress = 0;
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
}
