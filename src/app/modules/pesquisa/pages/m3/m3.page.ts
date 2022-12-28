import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { PesquisaM3 } from '../../models/interfaces/pesquisa-m3.dto';
import { NotaM3, PesquisaM3Inserir, ValorM3 } from '../../models/requests/pesquisa-m3-inserir.request';
import { PesquisaM3Obter } from '../../models/requests/pesquisa-m3-obter.request';
import { PesquisaService } from '../../services/pesquisa.service';

@Component({
    selector: 'bpgear-m3',
    templateUrl: './m3.page.html',
    styleUrls: ['./m3.page.scss']
})
export class M3Page implements OnInit {
    pesquisaM3: PesquisaM3 = null;
    form: NgTypeFormGroup<PesquisaM3Inserir>;
    finalizarPesquisa = false;
    iconDetalhar = faInfoCircle;
    valoresNotas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'N/A'];

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
        const idCliente: string = this.route.snapshot.queryParamMap.get('cli');

        if (idEmpresa && idCliente) {
            const request: PesquisaM3Obter = { emp: idEmpresa, cli: idCliente };
            this.spinnerService.show();
            this.pesquisaService.obterDadosM3(request)
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

                        this.pesquisaM3 = response.data;

                        this.form = this.fb.group<PesquisaM3Inserir>({
                            idEmpresa: [idEmpresa],
                            idCliente: [idCliente],
                            valores: this.fb.array(this.pesquisaM3.valor.map((v) => {
                                return this.fb.group<ValorM3>({
                                    idValor: [v.id],
                                    observacao: ['', [Validators.maxLength(500)]],
                                    notas: this.fb.array(this.pesquisaM3.bemServico.map((b) => {
                                        return this.fb.group<NotaM3>({
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
        const request: PesquisaM3Inserir = this.form.value;
        this.spinnerService.show();
        this.pesquisaService.inserirDadosM3(request)
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

    get formGroup() {
        return this.form as FormGroup;
    }

    openModal(content, size = 'xl') {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size });
    }


}
