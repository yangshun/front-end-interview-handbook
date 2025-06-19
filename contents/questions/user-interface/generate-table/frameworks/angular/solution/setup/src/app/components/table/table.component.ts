import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { TableData } from '../../models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  tableData!: number[][];

  @Input()
  set data(tableData: TableData) {
    this.tableData = [];
    for (let row = 0; row < tableData.rows; row++) {
      const rowData: number[] = [];

      for (let col = 0; col < tableData.cols; col++) {
        const cellValue =
          col % 2 === 0
            ? tableData.rows * col + (row + 1)
            : tableData.rows * (col + 1) - row;
        rowData.push(cellValue);
      }

      this.tableData.push(rowData);
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
