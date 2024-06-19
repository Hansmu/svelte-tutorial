<script lang="ts">
    import TreeNode, {type Node} from "./TreeNode.svelte";

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

<h2>Special elements example</h2>

<h3>Recursive component example</h3>

{#each familyStructure as familyMember}
    <TreeNode member={familyMember} />
{/each}
