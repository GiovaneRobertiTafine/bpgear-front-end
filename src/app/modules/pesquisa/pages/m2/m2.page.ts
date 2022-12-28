import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { PesquisaM2 } from '../../models/interfaces/pesquisa-m2.dto';
import { NotaM2, PesquisaM2Inserir, ValorM2 } from '../../models/requests/pesquisa-m2-inserir.request';
import { PesquisaM2Obter } from '../../models/requests/pesquisa-m2-obter.request';
import { PesquisaM3Inserir } from '../../models/requests/pesquisa-m3-inserir.request';
import { PesquisaService } from '../../services/pesquisa.service';

@Component({
    selector: 'bpgear-m2',
    templateUrl: './m2.page.html',
    styleUrls: ['./m2.page.scss']
})
export class M2Page implements OnInit {
    pesquisaM2: PesquisaM2 = null;
    form: NgTypeFormGroup<PesquisaM2Inserir>;
    finalizarPesquisa = false;
    iconDetalhar = faInfoCircle;
    valoresNotas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
            const request: PesquisaM2Obter = { emp: idEmpresa, col: idColaborador };
            this.spinnerService.show();
            this.pesquisaService.obterDadosM2(request)
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

                        this.pesquisaM2 = response.data;

                        this.form = this.fb.group<PesquisaM2Inserir>({
                            idEmpresa: [idEmpresa],
                            idColaborador: [idColaborador],
                            valores: this.fb.array(this.pesquisaM2.valor.map((v) => {
                                return this.fb.group<ValorM2>({
                                    idValor: [v.id],
                                    notas: this.fb.array(this.pesquisaM2.bemServico.map((b) => {
                                        return this.fb.group<NotaM2>({
                                            idBemServico: [b.id],
                                            nota: ['', [Validators.required]]
                                        });
                                    }))
                                });
                            }))
                        });
                    }
                );
        }
    }

    inserirDados(): void {
        const request: PesquisaM2Inserir = this.form.value;
        this.spinnerService.show();
        this.pesquisaService.inserirDadosM2(request)
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }
                    this.modalService.dismissAll();
                    this.toastService.success(response.resultStatus.message);
                    this.finalizarPesquisa = true;
                });
    }


    get formArrValores() {
        return this.form.get('valores') as FormArray;
    }

    valorNotas(empIndex: number): FormArray {
        return this.formArrValores
            .at(empIndex)
            .get('notas') as FormArray;
    }

    get formGroup() {
        return this.form as FormGroup;
    }

    obterNomeValor(idValor): string {
        let nomeValor = "";
        this.pesquisaM2.valor.forEach((v) => {
            if (idValor === v.id) nomeValor = v.nome;
        });
        return nomeValor;
    }

    openModal(content, size = 'xl') {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size });
    }


}
