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

<style>
	/* Monokai Pro Color Palette */
	:root {
		--bg-primary: #2d2a2e;
		--bg-secondary: #403e41;
		--bg-tertiary: #5b595c;
		--text-primary: #fcfcfa;
		--text-secondary: #939293;
		--accent-green: #a9dc76;
		--accent-blue: #78dce8;
		--accent-purple: #ab9df2;
		--accent-orange: #fc9867;
		--accent-red: #ff6188;
		--accent-yellow: #ffd866;
		--border-color: #5b595c;
		--shadow: rgba(0, 0, 0, 0.3);
	}

	/* Global Styles */
	:global(body) {
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		line-height: 1.6;
		margin: 0;
		padding: 20px;
	}

	/* Main Container */
	:global(main) {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}

	/* Typography */
	h1 {
		color: var(--accent-blue);
		font-size: 2.5rem;
		font-weight: 300;
		margin-bottom: 2rem;
		text-align: center;
		letter-spacing: -0.02em;
	}

	h2 {
		color: var(--accent-red);
		font-size: 1.5rem;
		font-weight: 400;
		text-align: center;
		margin: 2rem 0;
	}

	/* Form Styles */
	form {
		margin-bottom: 2rem;
	}

	form:first-of-type {
		display: flex;
		gap: 12px;
		margin-bottom: 3rem;
		align-items: center;
		justify-content: center;
	}

	/* Input Styles */
	input[type="text"] {
		background-color: var(--bg-secondary);
		border: 2px solid var(--border-color);
		border-radius: 8px;
		color: var(--text-primary);
		font-size: 1rem;
		padding: 12px 16px;
		min-width: 300px;
		transition: all 0.2s ease;
		outline: none;
	}

	input[type="text"]:focus {
		border-color: var(--accent-blue);
		box-shadow: 0 0 0 3px rgba(120, 220, 232, 0.1);
		transform: translateY(-1px);
	}

	input[type="text"]:hover {
		border-color: var(--accent-purple);
	}

	/* Checkbox Styles */
	input[type="checkbox"] {
		appearance: none;
		width: 20px;
		height: 20px;
		border: 2px solid var(--border-color);
		border-radius: 4px;
		background-color: var(--bg-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		margin-right: 12px;
	}

	input[type="checkbox"]:checked {
		background-color: var(--accent-green);
		border-color: var(--accent-green);
	}

	input[type="checkbox"]:checked::after {
		content: '✓';
		position: absolute;
		top: -2px;
		left: 3px;
		color: var(--bg-primary);
		font-size: 14px;
		font-weight: bold;
	}

	input[type="checkbox"]:hover {
		border-color: var(--accent-green);
		transform: scale(1.05);
	}

	/* Button Styles */
	button {
		background-color: var(--accent-red);
		border: none;
		border-radius: 6px;
		color: var(--text-primary);
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		padding: 8px 16px;
		transition: all 0.2s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	button:hover {
		background-color: #ff4757;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--shadow);
	}

	button:active {
		transform: translateY(0);
		box-shadow: 0 2px 6px var(--shadow);
	}

	/* List Styles */
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 12px;
		padding: 16px 20px;
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}

	li:hover {
		background-color: var(--bg-tertiary);
		border-color: var(--accent-purple);
		transform: translateX(4px);
		box-shadow: -4px 0 0 var(--accent-purple);
	}

	li:has(input[type="checkbox"]:checked) {
		background-color: rgba(169, 220, 118, 0.1);
		border-color: var(--accent-green);
	}

	li:has(input[type="checkbox"]:checked) span {
		color: var(--text-secondary);
		opacity: 0.7;
	}

	/* Todo Text */
	span {
		flex: 1;
		font-size: 1.1rem;
		color: var(--text-primary);
		transition: all 0.2s ease;
	}

	/* Form within list items */
	li form {
		margin: 0;
		display: flex;
		align-items: center;
	}

	li form:first-child {
		gap: 0;
	}

	/* Subtle animations */
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	li {
		animation: slideIn 0.3s ease-out;
	}

	/* Responsive Design */
	@media (max-width: 600px) {
		:global(body) {
			padding: 10px;
		}

		h1 {
			font-size: 2rem;
		}

		input[type="text"] {
			min-width: 250px;
		}

		form:first-of-type {
			flex-direction: column;
			gap: 16px;
		}

		li {
			padding: 12px 16px;
			flex-wrap: wrap;
			gap: 12px;
		}
	}

	/* Focus indicators for accessibility */
	button:focus-visible,
	input:focus-visible {
		outline: 2px solid var(--accent-yellow);
		outline-offset: 2px;
	}
</style>
