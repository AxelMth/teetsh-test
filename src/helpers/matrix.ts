import { ProgrammationViewMode } from '../constants/programmation.const';
import { Domaine, Periode } from '../intefaces/programmation';
import { Row, Column } from '../intefaces/matrix';

export const getMatrix = (
  viewMode: ProgrammationViewMode,
  periods: Periode[],
  domains: Domaine[]
): {
  rows: Row[];
  columns: Column[];
} => {
  let rows = [];
  let columns = [];
  if (viewMode === ProgrammationViewMode.DOMAINES) {
    columns = domains.map((d) => ({
      id: d.id,
      title: d.name,
      color: d.color,
    }));
    rows = periods.map((p) => ({
      id: p.id,
      title: p.name,
      color: p.color,
    }));
    return {
      rows,
      columns
    }
  }
  columns = periods.map((p) => ({
    id: p.id,
    title: p.name,
    color: p.color,
  }));
  rows = domains.map((d) => ({
    id: d.id,
    title: d.name,
    color: d.color,
  }));
  return {
    rows,
    columns,
  };
};
