<script lang="ts">
    import Toggle from "./Toggle.svelte";
    import CustomInput from "./CustomInput.svelte";

    let val = '';

    let toggledValue: number;

    let numberVal: number;

    let checkboxValue: boolean;

    let radioValue: string;

    let checkboxes: string[];

    let boundThisElement: HTMLInputElement;

    let customInput: CustomInput;

    $: {
        console.log(radioValue);
    }

    $: {
        console.log(checkboxes);
    }

    const boundThisValue = () => {
        console.log(boundThisElement.value);
        // You can call exported functions from the Svelte element
        // Rarely need it, but it's there
        customInput?.noOpFunction();
    }
</script>

<h3>Custom input</h3>
<!-- Using binding should be done sparingly, as it can get out of control -->
<!-- You might want to reach for event dispatching from a child instead -->
<CustomInput bind:val bind:this={customInput} />

<h3>Toggle element</h3>
<Toggle bind:chosenOption={toggledValue}/>

<h3>Number input</h3>
<!-- Numbers have interesting behaviour, as when you're binding, then it gets automatically converted into a number -->
<!-- If you're doing on:change, then you need to manually convert it into a number yourself -->
<input type="number" bind:value={numberVal} />

<h3>Checkbox</h3>
<label>
    <!-- With a checkbox, you want the checked value, not the value -->
    <input type="checkbox" bind:checked={checkboxValue} />
    Agree to checkbox?
</label>

<h3>Radio group</h3>
<label>
    <input type="radio" name="color" value="red" bind:group={radioValue}/>
    Red
</label>
<label>
    <input type="radio" name="color" value="blue" bind:group={radioValue}/>
    Blue
</label>
<label>
    <input type="radio" name="color" value="green" bind:group={radioValue}/>
    Green
</label>


<h3>Checkboxes</h3>
<label>
    <input type="checkbox" name="checkboxes" value="red" bind:group={checkboxes}/>
    Red
</label>
<label>
    <input type="checkbox" name="checkboxes" value="blue" bind:group={checkboxes}/>
    Blue
</label>
<label>
    <input type="checkbox" name="checkboxes" value="green" bind:group={checkboxes}/>
    Green
</label>

<h3>This bind (element ref)</h3>
<!-- If you want to bind to the DOM element itself, you can use `bind:this`. Kind of like React's ref -->
<!-- Works on any element, here it's just demoed on an input -->
<input type="text" bind:this={boundThisElement} />
<button on:click={boundThisValue} type="button">Save</button>