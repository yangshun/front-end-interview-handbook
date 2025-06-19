import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list.component';
import { BulkSelectionCheckboxComponent } from './bulk-selection-checkbox.component';
import { CheckboxItemComponent } from './checkbox-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    BulkSelectionCheckboxComponent,
    CheckboxItemComponent,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
