import {
    addTransitionClass,
    removeTransitionClass,
    whenTransitionEnds,
    TransitionElement,
    nextTick,
} from 'intact';
import {Feedback} from '../position';
import type {FeedbackCallback} from './usePosition';

export function useTransition(getFeedback: (callback: FeedbackCallback) => void) {
    let transition = 'k-slidedown';

    function onEnter(el: TransitionElement, done: Function) {
        getFeedback(feedback => {
            transition = getTransition(feedback as Feedback);
            const enterFromClass = `${transition}-enter-from`;
            const enterActiveClass = `${transition}-enter-active`;

            addTransitionClass(el, enterFromClass);

            document.body.offsetWidth;

            addTransitionClass(el, enterActiveClass);
            removeTransitionClass(el, enterFromClass);

            whenTransitionEnds(el, () => {
                onEnterCancelled(el);
                done();
            });
        });
    }

    function onEnterCancelled(el: TransitionElement) {
        removeTransitionClass(el, `${transition}-enter-active`);
    }

    function onLeave(el: TransitionElement, done: Function) {
        // maybe the position has changed, so we re-get it
        getFeedback(feedback => {
            transition = getTransition(feedback);
            addTransitionClass(el, `${transition}-leave-to`);
            addTransitionClass(el, `${transition}-leave-active`);

            whenTransitionEnds(el, () => {
                onLeaveCancelled(el);
                done();
            });
        });
    }

    function onLeaveCancelled(el: TransitionElement) {
        removeTransitionClass(el, `${transition}-leave-to`);
        removeTransitionClass(el, `${transition}-leave-active`);
    }

    return {onEnter, onEnterCancelled, onLeave, onLeaveCancelled};
}

function getTransition(feedback: Feedback) {
    const horizontal = feedback.horizontal;
    const vertical = feedback.vertical;
    if (feedback.important=== 'horizontal') {
        if (horizontal === 'left') {
            return 'k-slideright';
        } else if (horizontal === 'right') {
            return 'k-slideleft';
        } else if (vertical === 'bottom') {
            return 'k-slideup';
        } else if (vertical === 'top') {
            return 'k-slidedown';
        }
    } else {
        if (vertical === 'bottom') {
            return 'k-slideup';
        } else if (vertical === 'top') {
            return 'k-slidedown';
        } else if (horizontal === 'left') {
            return 'k-slideright';
        } else if (horizontal === 'right') {
            return 'k-slideleft';
        }
    }
    return 'k-slidedown';
}
