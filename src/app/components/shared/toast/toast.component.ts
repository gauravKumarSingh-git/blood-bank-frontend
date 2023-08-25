import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

	showStandard() {
		this.toastService.show('I am a standard toast');
	}

	showSuccess(successTpl: string | TemplateRef<any>) {
		this.toastService.show(successTpl, { classname: 'bg-success text-light', delay: 3000 });
	}

	showDanger(dangerTpl: string | TemplateRef<any>) {
		this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 3000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
