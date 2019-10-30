import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule, MatTabsModule, MatChipsModule, MatDatepicker, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,MatDialogModule } from  '@angular/material';

@NgModule({
imports: [
MatButtonModule,
MatFormFieldModule,
MatInputModule,
MatDividerModule,
MatSliderModule,
MatCardModule,
MatMenuModule,
MatToolbarModule,
 MatIconModule, 
MatSidenavModule,
 MatListModule,
 MatDialogModule,
 MatTabsModule,
 MatChipsModule,
 MatDatepickerModule,
 MatNativeDateModule,
 MatSelectModule,
 MatAutocompleteModule
],

exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSliderModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
     MatIconModule, 
    MatSidenavModule,
     MatListModule,
     MatDialogModule,
     MatTabsModule,
     MatChipsModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatSelectModule,
     MatAutocompleteModule
],
})
export class AppMaterialModule { }