import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepItem } from '@shared/components/tvb-steps/tvb-steps.component';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  private model: StepItem[] = [];
  private currentStepIndex$ = new BehaviorSubject<number>(0);
  private steps$ = new BehaviorSubject<StepItem[]>([]);
  // The Stash is where auxiliary data can be stored, in favor of avoiding LocalStorage.
  private stash: any = {};

  constructor() {}

  getCurrentStepIndex(): BehaviorSubject<number> {
    return this.currentStepIndex$;
  }

  setCurrentStepIndex(index: number): void {
    this.currentStepIndex$.next(index);
  }

  getModel(): BehaviorSubject<StepItem[]> {
    return this.steps$;
  }

  setModel(model: StepItem[]): void {
    this.model = model;
  }

  markIndexAsCompleted(index: number): void {
    this.model[index].completed = true;
  }

  unmarkIndexAsCompleted(index: number): void {
    this.model[index].completed = false;
  }

  markIndexAsDisabled(index: number): void {
    this.model[index].disabled = true;
  }

  unmarkIndexAsDisabled(index: number): void {
    this.model[index].disabled = false;
  }

  markIndexAsAvailable(index: number): void {
    this.model[index].available = true;
  }

  unmarkIndexAsAvailable(index: number): void {
    this.model[index].available = false;
  }

  setStashItem(itemName: string, itemValue: any): void {
    this.stash[itemName] = itemValue;
  }

  dropStashItem(itemName: string): void {
    delete this.stash[itemName];
  }

  getStashItem(itemName: string): any {
    return this.stash[itemName] || null;
  }

  clearStash(): void {
    this.stash = {};
  }

  // Broadcasts the model state to all the subscribers
  broadcastModelChanges(): void {
    this.steps$.next(this.model);
  }
}
