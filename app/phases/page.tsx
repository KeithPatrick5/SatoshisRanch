export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { PhaseList } from '@/components/PhaseList';
export default function Phases(){return <Shell><PageTitle title="30 phase project bible" subtitle="Each phase has a doc, implementation surface, and audit gate."/><PhaseList/></Shell>}
