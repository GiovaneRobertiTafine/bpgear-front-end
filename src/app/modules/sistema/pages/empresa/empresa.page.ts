import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEmpresaCriarComponent } from '../../components/modal-empresa-criar/modal-empresa-criar.component';
import { ModalEmpresaEditarComponent } from '../../components/modal-empresa-editar/modal-empresa-editar.component';
import { EmpresaDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { TitleService } from 'src/app/modules/shared/services/title.service';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
@Component({
    selector: 'bpgear-empresa',
    templateUrl: './empresa.page.html',
    styleUrls: ['./empresa.page.scss']
})
export class EmpresaPage implements OnInit, AfterViewInit, OnDestroy {
    empresas: Empresa[] = [];
    empresaDataViewConfig = EmpresaDataViewConfig;
    @ViewChild('colAcessar') colAcessar;
    iconAcessar = faArrowRight;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        public titleService: TitleService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.empresaService.removeEmpresa();

    }

    ngOnInit(): void {
        this.obterEmpresas();
    }

    obterEmpresas(): void {
        this.spinnerService.show();
        this.empresaService.obterEmpresa()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {
                this.spinnerService.hide();
                if (response.resultStatus.code !== 200 && response.resultStatus.code !== 204) {
                    this.toastService.error(response.resultStatus.message);
                    return;
                }

                this.empresas = response.data;
            });
    }

    ngAfterViewInit(): void {
        // this.dataViewConfigEmpresa.colunas[this.dataViewConfigEmpresa.colunas.length - 1].template = this.colAcessar;

    }

    menorQue(valor: number): boolean {
        console.log(valor);
        return valor < 11212312312 ? true : false;
    }

    criarEmpresa(): void {
        const modalRef = this.modalService.open(ModalEmpresaCriarComponent, { size: 'lg' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterEmpresas();
                }
            })
            .catch((err) => err);
    }

    deletarEmpresa(empresa: Empresa): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.empresa = empresa;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterEmpresas();
                }
            })
            .catch((err) => err);
    }

    editarEmpresa(empresa: Empresa): void {
        const modalRef = this.modalService.open(ModalEmpresaEditarComponent, { size: 'lg' });
        modalRef.componentInstance.empresa = empresa;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterEmpresas();
                }
            })
            .catch((err) => err);
    }

    acessarEmpresa($event: Empresa): void {
        this.empresaService.setEmpresa($event);
        this.router.navigate(['../colaborador', $event.id], { relativeTo: this.activatedRoute });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }

}
