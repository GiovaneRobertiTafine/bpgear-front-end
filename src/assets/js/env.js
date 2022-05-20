(function (window) {
    window.env = window.env || {};
    window["env"]["api_auth_url"] = "https://localhost:7244";
    window["env"]["cabine_worker_url"] = "http://localhost:8088/jdpi/cabine/api/v1";
    window["env"]["cabine_link_resolucao_bcb31"] = "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=31";
    window["env"]["cabine_link_manual_tempos"] = "https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/IX.ManualdeTemposdoPix-versao2.2.pdf";
    window["env"]["cabine_funcoes_agencia_conta"] = 'true';
    window['env']['cabine_funcoes_range_maximo_dias'] = null;
})(this);