<script lang="ts">
    import TreeNode, {type Node} from "./TreeNode.svelte";

    let scrollY: number = 0;

    const familyStructure: Node[] = [
        {
            isParent: true,
            name: "Chris",
            children: [
                {
                    isParent: true,
                    name: "Moe",
                    children: [{isParent: false, name: "Julie"}]
                }
            ]
        },
        {isParent: false, name: "Anna"}
    ];
</script>
<!-- There are a couple of special elements in Svelte that can be used to interact with window, body, and head -->

<!-- You can access the window with this. You can also do it in your <script> tag, but doing it via Svelte is safer. -->
<!-- It's mainly here for server-side rendering, because when the page is being rendered, then no window is present. -->
<!-- You can bind, you can add event listeners etc. -->
<svelte:window bind:scrollY />

<!-- You can access the body with this. -->
<svelte:body on:mouseenter={() => console.log('Mouse entered body')} />

<h2>Special elements example</h2>

<h3>Recursive component example</h3>

{#each familyStructure as familyMember}
    <TreeNode member={familyMember} />
{/each}
