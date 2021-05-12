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
  hasUnitNumber = false;
  alocacao: Alocacao;
  alocacao2: Alocacao;

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
      ano: [null],
      semestre: [null],
      horasSolicitadas: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
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
      observacao: [null],
      ano: [null],
      semestre: [null],
      horasSolicitadas: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
    });

    this.regenciaForm = this.fb.group({
      nivel: [null, Validators.required],
      curso: [null, Validators.required],
      coordenador: [null, Validators.required],
      disciplinaParticipacao: [null],
      cargaHoraTotalMinistrada: [null, Validators.required],
      cargaHorariaTotalDedicada: [null],
      valorBrutoHoraAula: [null, Validators.required],
      valorBrutoTotalAula: [null, Validators.required],
      valorBrutoOutraAtividade: [null, Validators.required],
      instituicao: [null, Validators.required],
      diasTrabalhadosUnicamp: [null, Validators.required],
      diasTrabalhadosOutraInstituicao: [null, Validators.required],
      responsavel: [null, Validators.required],
      unicoDocente: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      horaSemanal: [null, Validators.required],
      horaMensal: [null, Validators.required],
      observacao: [null],
      ano: [null],
      semestre: [null],
      horasSolicitadas: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
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
    this.convenioModel.alocacoes = [];
    this.alocacao = new Alocacao();
    this.alocacao.ano = this.convenioForm.get('ano').value;
    this.alocacao.semestre = this.convenioForm.get('semestre').value;
    this.alocacao.horasSolicitadas = this.convenioForm.get('horasSolicitadas').value;
    this.convenioModel.alocacoes.push(this.alocacao);

    if(this.hasUnitNumber) {
      this.alocacao2 = new Alocacao();
      this.alocacao2.ano = this.convenioForm.get('ano2').value;
      this.alocacao2.semestre = this.convenioForm.get('semestre2').value;
      this.alocacao2.horasSolicitadas = this.convenioForm.get('horasSolicitadas2').value;
      this.convenioModel.alocacoes.push(this.alocacao2);
    }

    this.convenioService.salvarConvenio(this.convenioModel).subscribe(
      data => {
        this.upload(data.id);
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
    this.cursoModel.cargaHorariaTotal = this.cursoForm.get('totalHorasMinistradas').value;
    this.cursoModel.horaSemanal = this.cursoForm.get('horaSemanal').value;
    this.cursoModel.horaMensal = this.cursoForm.get('horaMensal').value;
    this.cursoModel.valorBrutoHoraAula = this.cursoForm.get('valorBrutoHoraAula').value;
    this.cursoModel.valorBrutoTotalAula = this.cursoForm.get('valorBrutoTotalAula').value;
    this.cursoModel.valorBrutoOutraAtividade = this.cursoForm.get('valorBrutoOutraAtividade').value;
    this.cursoModel.dataInicio = this.cursoForm.get('dataInicio').value;
    this.cursoModel.dataFim = this.cursoForm.get('dataFim').value;
    this.cursoModel.instituicaoVinculada = this.cursoForm.get('instituicaoVinculada').value;
    this.cursoModel.alocacoes = [];

    this.alocacao = new Alocacao();
    this.alocacao.ano = this.convenioForm.get('ano').value;
    this.alocacao.semestre = this.convenioForm.get('semestre').value;
    this.alocacao.horasSolicitadas = this.convenioForm.get('horasSolicitadas').value;
    this.cursoModel.alocacoes.push(this.alocacao);

    if(this.hasUnitNumber) {
      this.alocacao2 = new Alocacao();
      this.alocacao2.ano = this.convenioForm.get('ano2').value;
      this.alocacao2.semestre = this.convenioForm.get('semestre2').value;
      this.alocacao2.horasSolicitadas = this.convenioForm.get('horasSolicitadas2').value;
      this.cursoModel.alocacoes.push(this.alocacao2);
    }

    this.cursoService.salvarCurso(this.cursoModel).subscribe(
      data => {
        this.upload(data.id);
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
    this.regenciaModel.alocacoes = [];

    this.alocacao = new Alocacao();
    this.alocacao.ano = this.regenciaForm.get('ano').value;
    this.alocacao.semestre = this.regenciaForm.get('semestre').value;
    this.alocacao.horasSolicitadas = this.regenciaForm.get('horasSolicitadas').value;
    this.regenciaModel.alocacoes.push(this.alocacao);

    if(this.hasUnitNumber) {
      this.alocacao2 = new Alocacao();
      this.alocacao2.ano = this.regenciaForm.get('ano2').value;
      this.alocacao2.semestre = this.regenciaForm.get('semestre2').value;
      this.alocacao2.horasSolicitadas = this.regenciaForm.get('horasSolicitadas2').value;
      this.regenciaModel.alocacoes.push(this.alocacao2);
    }

    this.atividadeService.salvarRegencia(this.regenciaModel).subscribe(
      data => {
        this.upload(data.id);
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
