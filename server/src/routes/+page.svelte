<script>
// @ts-nocheck


	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

    let {data} = $props()
    // $inspect(data)
</script>

<h1>Todos (server.ts)</h1>
{#if data?.content?.ok }
    <form method=POST action=/api/todos use:enhance={() => {
        return async ({update}) => {
            await update()
            invalidateAll()
        }
    }}>
        <input type="hidden" name="marker" value="ADD" />
        <input type="text" name="todo" />
    </form>
    <ul>
        {#each data.content.content as todo, i (todo.id) }
            <li>

                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <form method=POST action=/api/todos
                onclick={(e) => {if(e.target.type === 'checkbox') e.target.form.requestSubmit()}}
                use:enhance={() => {
                    return async ({update}) => {
                        await update()
                        invalidateAll()
                    }
                }} >
                    <input type="hidden" name="marker" value="TOGGLE" />
                    <input type="hidden" name="id" value={todo.id} />
                    <input type="checkbox" name="done" checked={todo.done}/>
                </form>
                <span>{todo.text}</span>
                <form method=POST action=/api/todos use:enhance={() => {
                    return async ({update}) => {
                        await update()
                        invalidateAll()
                    }
                }}>
                    <input type="hidden" name="marker" value="DELETE" />
                    <input type="hidden" name="deleteId" value={todo.id} />
                    <button type="submit">delete</button>
                </form>
            </li>
        {/each}
    </ul>
    {:else}
    <h2>{data?.content}</h2>
{/if}
