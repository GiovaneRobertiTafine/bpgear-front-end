import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { SetorDataInputDropdown } from '../../models/constants/pesquisa-data-input-dropdown-config.constant';
import { PesquisaM1 } from '../../models/interfaces/pesquisa-m1.dto';
import { AcaoM1, PesquisaM1Inserir, ValorM1 } from '../../models/requests/pesquisa-m1-inserir.request';
import { PesquisaM1Obter } from '../../models/requests/pesquisa-m1-obter.request';
import { PesquisaService } from '../../services/pesquisa.service';

@Component({
    selector: 'bpgear-m1',
    templateUrl: './m1.page.html',
    styleUrls: ['./m1.page.scss']
})
export class M1Page implements OnInit {
    pesquisaM1: PesquisaM1 = null;
    setorDataInputDropdown = SetorDataInputDropdown;
    form: NgTypeFormGroup<PesquisaM1Inserir>;
    iconDetalhar = faInfoCircle;
    finalizarPesquisa = false;

    constructor(
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private pesquisaService: PesquisaService,
        private fb: FormTypeBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        const idEmpresa: string = this.route.snapshot.queryParamMap.get('emp');
        const idColaborador: string = this.route.snapshot.queryParamMap.get('col');

        if (idEmpresa && idColaborador) {
            const request: PesquisaM1Obter = { emp: idEmpresa, col: idColaborador };
            this.spinnerService.show();
            this.pesquisaService.obterDadosM1(request)
                .subscribe(
                    (response) => {
                        this.spinnerService.hide();

                        if (response.resultStatus.code === 302) {
                            this.toastService.warning(response.resultStatus.message);
                            this.router.navigate(['/login']);
                            return;
                        }

                        if (response.resultStatus.code !== 200) {
                            this.toastService.error(response.resultStatus.message);
                            return;
                        }

                        this.pesquisaM1 = response.data;

                        this.form = this.fb.group<PesquisaM1Inserir>({
                            idEmpresa: [idEmpresa],
                            idColaborador: [idColaborador],
                            valores: this.fb.array(this.pesquisaM1.valor.map((v) => {
                                return this.fb.group<ValorM1>({
                                    idValor: [v.id],
                                    acoes: this.fb.array([this.initItemRows()])
                                });
                            }))
                        });
                    }
                );
        }

    }

    inserirDados(): void {
        const request: PesquisaM1Inserir = this.form.value;
        this.spinnerService.show();
        this.pesquisaService.inserirDadosM1(request)
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }
                    this.modalService.dismissAll();
                    this.toastService.success(response.resultStatus.message);
                    // this.finalizarPesquisa = true;
                    this.router.navigate(['/pesquisa/m2'], { queryParams: { emp: request.idEmpresa, col: request.idColaborador } });
                }
            );
    }

    get formArrValores() {
        return this.form.get('valores') as FormArray;
    }

    valorAcoes(empIndex: number): FormArray {
        return this.formArrValores
            .at(empIndex)
            .get('acoes') as FormArray;
    }

    get formGroup() {
        return this.form as FormGroup;
    }

    initItemRows() {
        return this.fb.group<AcaoM1>({
            acao: ["", [Validators.required, Validators.maxLength(500)]],
            idEnvolvido: [],
            idResponsavel: []
        });
    }

    adicionarAcao(iValor: number): void {
        this.valorAcoes(iValor).push(this.initItemRows());
    }

    obterNomeValor(idValor): string {
        let nomeValor = "";
        this.pesquisaM1.valor.forEach((v) => {
            if (idValor === v.id) nomeValor = v.nome;
        });
        return nomeValor;
    }

    convertFormGroup(formGroup): FormGroup {
        return formGroup as FormGroup;
    }

    removerAcao(iValor: number, iAcoes: number) {
        this.valorAcoes(iValor).removeAt(iAcoes);
    }

    openModal(content, size = 'xl') {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size });
    }

}
