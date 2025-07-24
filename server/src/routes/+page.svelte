<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

    let {data} = $props()
    $inspect(data)
</script>

<h1>Todos (server.ts)</h1>
{#if data?.content?.ok }
    <form method=POST action=/api/todos use:enhance={() => {
        return async ({update}) => {
            await update()
            invalidateAll()
        }
    }}>
        <input type="text" name="todo" />
    </form>
    <ul>
        {#each data.content.content as todo, i (todo.id) }
            <li>
                <input type="checkbox">
                <span>{todo.text}</span>
                <button>delete</button>
            </li>
        {/each}
    </ul>
    {:else}
    <h2>{data?.content}</h2>
{/if}
