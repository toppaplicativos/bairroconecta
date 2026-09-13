export type ReportStatus = 'received' | 'triage' | 'forwarded' | 'resolved';

export type OmbudsmanReport = {
  id: string;
  title: string;
  category: string;
  address: string;
  status: ReportStatus;
  statusLabel: string;
  updatedAt: string;
  supporters: number;
  description: string;
};

export const ombudsmanReports: OmbudsmanReport[] = [
  {
    id: 'MB-2026-1842',
    title: 'Iluminação insuficiente na praça',
    category: 'Iluminação pública',
    address: 'Praça Central · Setor Norte',
    status: 'forwarded',
    statusLabel: 'Encaminhada',
    updatedAt: 'Atualizada há 2 h',
    supporters: 34,
    description: 'Dois postes permanecem apagados no trecho próximo ao parquinho e à quadra.',
  },
  {
    id: 'MB-2026-1837',
    title: 'Buraco aumentando na via principal',
    category: 'Via pública',
    address: 'Av. Principal · próximo ao nº 620',
    status: 'triage',
    statusLabel: 'Em triagem',
    updatedAt: 'Atualizada há 5 h',
    supporters: 19,
    description: 'O ponto está forçando veículos a desviar para a faixa contrária nos horários de pico.',
  },
  {
    id: 'MB-2026-1811',
    title: 'Coleta irregular em duas ruas',
    category: 'Limpeza urbana',
    address: 'Ruas das Flores e Ipê',
    status: 'received',
    statusLabel: 'Recebida',
    updatedAt: 'Atualizada ontem',
    supporters: 12,
    description: 'Moradores registraram ausência da coleta em dois ciclos consecutivos.',
  },
  {
    id: 'MB-2026-1768',
    title: 'Faixa de pedestres revitalizada',
    category: 'Mobilidade',
    address: 'Rua da Escola · esquina com Rua 8',
    status: 'resolved',
    statusLabel: 'Resolvida',
    updatedAt: 'Concluída há 3 dias',
    supporters: 27,
    description: 'A sinalização horizontal foi refeita e a placa de travessia foi substituída.',
  },
];

export const ombudsmanMetrics = [
  { label: 'Demandas abertas', value: '31', helper: 'Acompanhamento público' },
  { label: 'Resolvidas', value: '74%', helper: 'Últimos 90 dias' },
  { label: 'Tempo médio', value: '3,2 dias', helper: 'Até primeiro retorno' },
  { label: 'Apoios', value: '412', helper: 'Mobilização comunitária' },
];
