---
layout: post
title: "有限理性的机器——赫伯特·西蒙的理论体系对 AI Agent 设计的深层启示"
title_en: "Machines of Bounded Rationality — Herbert Simon's Theoretical Legacy for AI Agent Design"
date: 2026-03-12
tags: [AI, Agent, Herbert Simon, Bounded Rationality, Cognitive Science, Multi-Agent]
categories: [essay, reading]
bilingual: true
---

<div class="lang-zh" markdown="1">

> *「一个人的理性是有限的——有限的知识、有限的计算能力、有限的注意力。在这些限制条件下，人们不是寻求最优解，而是寻求'足够好'的解。」*
> *—— Herbert A. Simon, Administrative Behavior (1947)*

---

2024 年以来，AI Agent 成为大语言模型（LLM）应用的核心范式。从 OpenAI 的 Function Calling 到 Anthropic 的 Tool Use，从 AutoGPT 到 Claude Code，「Agent」这个词几乎出现在每一篇 AI 应用论文和每一个产品发布会上。然而，当我们剥去技术炒作的外衣，仔细审视当下 Agent 系统面临的核心挑战——上下文窗口有限、规划能力不稳定、多 Agent 协调困难、何时停止搜索——会发现，这些问题几乎都被一位学者在半个多世纪前系统性地研究过。

这位学者就是赫伯特·亚历山大·西蒙（Herbert Alexander Simon, 1916–2001）。

西蒙是 20 世纪罕见的跨学科巨匠：1978 年诺贝尔经济学奖得主，1975 年图灵奖得主，同时在政治学、心理学、管理学、人工智能和认知科学领域做出了奠基性贡献。他的核心思想——**有限理性（bounded rationality）**——不仅重塑了经济学和组织理论，更直接催生了现代 AI 的多个核心概念。

本文试图系统梳理西蒙理论体系中与当代 AI Agent 设计最密切相关的六个理论模块，分析每个模块对 Agent 架构的具体启示，并指出当前主流 Agent 框架中哪些设计决策本质上是对西蒙思想的（有意或无意的）回应。

---

## 一、有限理性：Agent 设计的第一性原理

### 1.1 从「经济人」到「管理人」

西蒙对经济学的核心贡献是对新古典经济学「完全理性经济人」假设的系统性批判。在他 1947 年的博士论文《管理行为》（*Administrative Behavior*）中，西蒙指出：现实中的决策者面临三重根本性约束<sup>[1]</sup>：

1. **信息约束**：决策者不可能获取所有相关信息。
2. **计算约束**：即使获取了信息，决策者也没有足够的计算能力处理所有信息。
3. **注意力约束**：人类的注意力是稀缺资源，无法同时关注所有维度。

因此，决策者不是**最大化效用（maximizing）**，而是**满意化（satisficing）**——寻找一个满足最低可接受标准的方案，然后停止搜索。

### 1.2 LLM Agent 是「有限理性」的完美实例

这个理论框架与当代 LLM Agent 的对应关系几乎是惊人的精确：

| 西蒙的有限理性约束 | LLM Agent 的对应约束 | 具体表现 |
|---|---|---|
| 信息约束 | **上下文窗口（context window）有限** | Claude 200K tokens、GPT-4 128K tokens，超出即「遗忘」 |
| 计算约束 | **单次推理的计算预算有限** | 推理时间、token 生成速率、链式推理深度受限 |
| 注意力约束 | **注意力机制的实际有效范围有限** | Lost-in-the-middle 问题<sup>[2]</sup>，长上下文中间部分被忽略 |

Liu 等人（2024）在「Lost in the Middle」研究中实验性地证明了 LLM 的注意力分布呈 U 型曲线：模型对上下文开头和结尾的信息敏感度显著高于中间部分<sup>[2]</sup>。这与认知心理学中的**首因效应（primacy effect）**和**近因效应（recency effect）**高度一致——而这恰恰是西蒙在 1950 年代研究人类信息处理时就已经描述的现象。

### 1.3 对 Agent 设计的启示：拥抱有限性

西蒙理论的核心启示不是「如何克服有限性」，而是**「如何在有限性约束下做出足够好的决策」**。这对 Agent 设计意味着：

**（a）放弃全局最优的幻觉。** 很多 Agent 框架试图通过「思维链」（Chain-of-Thought）或「思维树」（Tree-of-Thought）来逼近最优推理路径。西蒙会指出：在搜索空间指数增长的条件下，穷举式搜索本身就是反理性的。真正理性的做法是使用**启发式（heuristics）**来剪枝。

**（b）设计显式的停止规则。** 满意化理论的核心是**何时停止搜索**。当前多数 Agent 框架缺乏清晰的停止准则——要么在达到 token 上限时被动终止，要么依赖模型自身的「判断」。西蒙的理论建议：Agent 应当有**显式的 aspiration level（期望水平）**，当找到满足该水平的方案时即停止。

**（c）上下文管理即注意力管理。** 西蒙在其 1971 年的著名论断中说：「信息丰富的世界中，信息的丰富意味着其他东西的匮乏——即信息所消耗的注意力的匮乏。」<sup>[3]</sup> 对 Agent 而言，context window 就是注意力。因此，**上下文管理（context management）策略——什么信息放入上下文、什么信息摘要、什么信息丢弃——是 Agent 架构中最核心的设计决策之一**，而非一个工程细节。

---

## 二、满意化搜索与 Agent 的规划策略

### 2.1 搜索作为决策的基本机制

西蒙与纽厄尔（Allen Newell）在 1950–70 年代的合作中，将问题求解形式化为**在问题空间（problem space）中的搜索**<sup>[4]</sup>。他们的核心框架是：

- **初始状态（initial state）**：问题的当前描述
- **目标状态（goal state）**：期望达到的结果
- **算子（operators）**：可用的操作或变换
- **搜索策略（search strategy）**：选择和应用算子的方法

这个框架直接映射到当代 Agent 的 ReAct（Reasoning + Acting）范式<sup>[5]</sup>：

| 问题空间概念 | Agent 对应概念 |
|---|---|
| 初始状态 | 用户 prompt + 当前环境状态 |
| 目标状态 | 任务完成条件 |
| 算子 | 可用工具（tools）/ 函数调用 |
| 搜索策略 | LLM 的推理 + 工具选择逻辑 |

### 2.2 手段-目的分析（Means-Ends Analysis）

西蒙和纽厄尔提出的**手段-目的分析（MEA）**是其最具影响力的问题求解策略<sup>[4]</sup>。MEA 的核心逻辑是：

1. 比较当前状态与目标状态，识别**差异（difference）**。
2. 搜索能**缩小该差异**的算子。
3. 如果该算子的前置条件不满足，则**递归地**将满足前置条件设为子目标。

这与当代 Agent 的**分层规划（hierarchical planning）**和**子目标分解（subgoal decomposition）**本质上是同一种思路。例如，当 Claude Code 接收到「重构这个模块」的指令时，它的隐式推理过程是：

```
目标：重构模块 X
当前状态：模块 X 包含函数 A, B, C，存在代码重复
差异：代码重复、耦合度高
可用算子：Read（读取文件）、Edit（编辑文件）、Grep（搜索模式）、Bash（运行测试）
子目标 1：理解当前代码结构（算子：Read, Grep）
子目标 2：识别重复模式（算子：Grep）
子目标 3：提取公共逻辑（算子：Edit）
子目标 4：验证重构正确性（算子：Bash → 运行测试）
```

### 2.3 启发式搜索与「足够好」的工具选择

西蒙反复强调：在复杂问题中，穷举搜索是不可行的，**启发式（heuristics）是理性行为的必要条件**<sup>[6]</sup>。

这对 Agent 的工具选择（tool selection）有直接启示。当前 Agent 面临的一个核心问题是：当可用工具数量增多时，工具选择的准确率下降。这本质上是一个搜索空间爆炸问题。西蒙的理论建议采用以下策略：

1. **识别-然后行动（Recognition-then-act）**：西蒙在研究国际象棋大师时发现，专家不是通过深度搜索来下棋，而是通过**模式识别（pattern recognition）**——识别棋盘上的模式，然后从记忆中提取与该模式关联的行动方案<sup>[7]</sup>。这对 Agent 意味着：与其让模型在每次调用时从头推理工具选择，不如通过 **few-shot examples** 或 **fine-tuning** 让模型学习「任务模式 → 工具序列」的映射。

2. **注意力过滤**：不是所有工具描述都需要放入上下文。根据任务类型预先过滤相关工具，减少搜索空间——这正是西蒙所说的「注意力的经济学」。

---

## 三、近似可分解性：多 Agent 系统的架构原理

### 3.1 复杂系统的层级结构

西蒙在其 1962 年的经典论文「The Architecture of Complexity」中提出了一个深刻的观察：**几乎所有复杂系统都呈现层级结构（hierarchical structure），而这种层级结构具有近似可分解性（near-decomposability）**<sup>[8]</sup>。

近似可分解性是指：

- 在**短期**内，系统中各子系统的行为近似**独立**。
- 在**长期**内，子系统之间的交互影响才变得显著。
- 子系统**内部**的交互强度远大于子系统**之间**的交互强度。

西蒙用一个著名的寓言来说明层级结构的进化优势——**钟表匠的寓言**<sup>[8]</sup>：

> 两个钟表匠分别制作包含 1000 个零件的手表。第一个钟表匠将所有零件一次性组装，任何打断都导致全部散架，需要从头来过。第二个钟表匠将手表设计为 10 个子组件，每个子组件包含 10 个部分，每部分包含 10 个零件。即使被打断，他最多只需重做一个小部分。结果，第二个钟表匠的效率远远高于第一个。

### 3.2 对多 Agent 架构的直接映射

近似可分解性理论为多 Agent 系统设计提供了第一性原理级别的指导：

**（a）任务分解应遵循近似可分解性原则。** 将一个大任务分解为多个子任务时，分解方式应使得子任务之间的**信息依赖最小化**。这不是一个工程偏好，而是一个来自复杂系统理论的深层原则：近似可分解的系统具有更高的鲁棒性和可进化性。

**（b）Agent 之间的通信拓扑应匹配任务的依赖结构。** 如果两个子任务高度独立（短期内近似可分解），那么负责这两个子任务的 Agent 之间不需要频繁通信。反之，如果两个子任务紧密耦合，则对应的 Agent 应当有低延迟的通信通道。

**（c）层级式 Agent 架构不是偏好，而是必然。** 西蒙论证了层级结构在进化和工程中的普遍性。对于多 Agent 系统，这意味着：**纯粹的扁平式 Agent 集群（如所有 Agent 地位完全对等）在复杂任务中不太可能是最优架构**。相反，某种形式的层级——协调者 Agent + 执行者 Agent——几乎是不可避免的。

以我在 [CivAgent](https://github.com/LeoLin990405/civagent) 项目中的实践为例：57 种历史政体的架构映射，本质上也是在探索不同的层级结构和分解方式。唐代三省六部制的三级审核，正是一种强层级的近似可分解结构——中书省起草、门下省审议、尚书省执行，三者在各自职责范围内近似独立运作，仅通过制度化的接口（封驳、署名）进行交互。

### 3.3 中间层的涌现

西蒙指出，在近似可分解系统中，**中间层（intermediate levels）具有特殊的重要性**<sup>[8]</sup>。它们既提供了足够的抽象来管理复杂性，又保留了足够的细节来执行具体操作。

这对 Agent 系统的启示是：在用户请求和底层工具调用之间，应当存在**中间抽象层**。当前许多 Agent 框架的问题恰恰在于缺少这个中间层——用户的高层意图直接映射到低层工具调用，中间没有「计划」或「策略」层的缓冲。这就像试图用汇编语言直接编写操作系统——理论上可行，但在复杂性管理上是灾难性的。

ReWOO（Xu et al., 2023）<sup>[9]</sup> 和 Plan-and-Execute 架构试图解决这个问题，它们在推理和执行之间引入了显式的规划层。从西蒙的理论视角看，这是在 Agent 系统中建立「中间层」的正确方向。

---

## 四、人工科学与 Agent 作为设计产物

### 4.1 自然科学 vs. 人工科学

西蒙在 1969 年出版的《人工科学》（*The Sciences of the Artificial*）中提出了一个被严重低估的认识论框架<sup>[10]</sup>：

- **自然科学**研究「事物是什么样的」（what things are）。
- **人工科学（设计科学）**研究「事物应该是什么样的」（what things ought to be）——即如何设计人工物（artifacts）来达成目标。

人工物的核心特征是：它是**内部环境（inner environment）**和**外部环境（outer environment）**之间的**接口（interface）**。人工物的行为取决于三者的交互：

```
外部环境（任务需求、用户意图、数据）
        ↕  接口（Agent 的行为表现）
内部环境（模型架构、参数、提示词、工具集）
```

### 4.2 Agent 的「接口」本质

这个框架对 Agent 设计的启示是深刻的：

**Agent 的「智能」不完全是内部属性，而是内部环境与外部环境匹配的结果。** 西蒙用一个著名的比喻来说明这一点：一只蚂蚁在沙滩上走出的路径看起来非常复杂，但这种复杂性主要来自沙滩表面的复杂性（外部环境），而非蚂蚁自身的复杂性（内部环境）<sup>[10]</sup>。

> 「一只蚂蚁，被视为一种行为系统，其实相当简单。它的行为在时间维度上的表观复杂性，主要反映的是它所处环境的复杂性。」

类推到 AI Agent：一个 Agent 在解决复杂编程任务时展现出的「智能」，相当一部分来自它所操作的**环境**——文件系统的结构、代码库的组织方式、错误信息的可解释性、测试框架的反馈质量。**因此，优化 Agent 的性能不仅仅是优化模型本身，更要优化 Agent 所处的环境。**

这解释了为什么 Claude Code 的许多设计决策——如 `CLAUDE.md` 文件、项目级别的指令、结构化的工具返回值——本质上是在**优化外部环境**，使其与 Agent 的内部能力更好地匹配。同样，MCP（Model Context Protocol）的核心价值也是在于**标准化 Agent 与外部环境的接口**。

### 4.3 适应性行为与环境设计

西蒙的人工科学理论还暗示了一个重要的设计原则：**与其试图构建一个在所有环境中都表现出色的通用 Agent，不如为特定任务类别设计匹配的环境。** 这与当前 Agent 领域的「通用 vs. 专用」辩论直接相关。

从西蒙的视角看，Agent 的专业化不一定体现在模型参数的特化，而可能体现在**工具集、上下文模板和评估标准的特化**——即外部环境的特化。一个「编程 Agent」和一个「写作 Agent」可能使用完全相同的底层模型，但配备不同的工具、不同的系统提示和不同的停止准则。

---

## 五、注意力经济学与上下文窗口管理

### 5.1 信息过载的预言

西蒙在 1971 年的一次演讲中提出了他最具预见性的观点之一<sup>[3]</sup>：

> *「在信息丰富的世界中，信息的丰富意味着某种其他东西的匮乏：即被信息所消耗之物的匮乏。信息消耗的是什么，这是相当明显的：它消耗的是接收者的注意力。因此，信息的丰富造成了注意力的贫乏，以及在可能消耗注意力的过度丰富的信息源中有效分配注意力的需要。」*

这段话写于互联网普及之前三十年，但它对当代 Agent 系统的适用性令人震撼。

### 5.2 上下文窗口作为注意力资源

对于 LLM Agent 而言，**上下文窗口就是注意力资源**。它是有限的、不可再生的（在单次推理中），并且其中信息的分布方式直接影响 Agent 的决策质量。

西蒙的注意力经济学理论为上下文管理提供了以下设计原则：

**（a）信息的价值不在于其内容，而在于其对决策的边际贡献。** 这意味着上下文管理策略应当基于**信息的决策相关性**来排序，而非基于信息的时间顺序或来源重要性。一段与当前子任务高度相关的错误日志，其上下文价值远高于一段详细但与当前步骤无关的系统架构描述。

**（b）注意力分配应当与任务阶段匹配。** 在规划阶段，Agent 需要宏观信息（项目结构、需求描述）；在执行阶段，Agent 需要微观信息（具体代码、API 文档）。上下文的内容应当随着任务阶段的推进而**动态调整**。

**（c）摘要是注意力管理的核心机制。** 西蒙指出，层级组织中信息向上传递时必然经历摘要和抽象<sup>[1]</sup>。类比到 Agent：当上下文接近窗口限制时，早期的详细信息应当被**摘要替代**，只保留对后续决策有影响的关键结论。这正是 Claude Code 在对话接近上下文限制时自动进行消息压缩的理论基础。

### 5.3 「充分信息」的幻觉

西蒙的理论还警告我们警惕一个常见的 Agent 设计陷阱：**试图将所有可能相关的信息都塞入上下文**。这种做法表面上是「给 Agent 更多信息」，实际上可能**降低**决策质量——因为关键信息被淹没在无关信息的海洋中。

这与 RAG（Retrieval-Augmented Generation）系统的常见问题直接相关。简单地增加检索数量（top-k）并不总是提高回答质量，因为更多的检索结果意味着更多的注意力竞争。西蒙的理论建议：**RAG 系统的核心挑战不是检索更多信息，而是检索更少但更相关的信息。**

---

## 六、产生式系统与 Agent 的认知架构

### 6.1 从 GPS 到产生式系统

西蒙和纽厄尔在 1957 年开发的**通用问题求解器（General Problem Solver, GPS）**是 AI 历史上第一个显式模拟人类问题求解过程的程序<sup>[4]</sup>。GPS 使用手段-目的分析来搜索问题空间，其架构基于**产生式规则（production rules）**：

```
IF  当前状态匹配条件 C
THEN  执行动作 A
```

这种 IF-THEN 规则的集合构成了一个**产生式系统（production system）**<sup>[11]</sup>。纽厄尔后来将这一思想发展为更完整的认知架构理论——ACT-R 和 SOAR，它们至今仍是认知科学中最有影响力的计算模型之一。

### 6.2 当代 Agent 框架中的产生式系统遗产

当代 Agent 框架中处处可见产生式系统的影子：

| 产生式系统概念 | 当代 Agent 对应 |
|---|---|
| 产生式规则（IF-THEN） | 系统提示中的条件指令（「如果用户要求 X，则使用工具 Y」） |
| 工作记忆（working memory） | 上下文窗口 |
| 长期记忆（long-term memory） | RAG、向量数据库、外部知识库 |
| 冲突解决（conflict resolution） | 当多条指令适用时的优先级逻辑 |
| 目标栈（goal stack） | 任务分解后的子目标队列 |

### 6.3 认知架构的现代复兴

值得注意的是，当前 Agent 研究中的许多「创新」概念——如 Reflexion（Shinn et al., 2023）<sup>[12]</sup> 中的自我反思机制、Voyager（Wang et al., 2023）<sup>[13]</sup> 中的技能库（skill library）——实际上与西蒙和纽厄尔数十年前在认知架构中研究的机制有深刻的同构关系：

- **Reflexion 的自我反思** ≈ SOAR 架构中的 **impasse detection + chunking**：当 Agent 遇到障碍时，回顾失败原因并生成新的规则。
- **Voyager 的技能库** ≈ ACT-R 中的 **procedural memory**：将成功的行动序列存储为可复用的程序。
- **MemGPT 的分层记忆** ≈ 西蒙描述的人类认知中 **短期记忆与长期记忆的交互**。

这不是巧合。西蒙和纽厄尔研究的是**智能行为的一般性结构**，而当代 Agent 系统——无论其底层技术是符号推理还是神经网络——都不可避免地需要面对同样的结构性问题。

---

## 七、组织理论与多 Agent 协调

### 7.1 组织作为信息处理系统

西蒙在《管理行为》及后续著作中将组织视为一种**信息处理系统**<sup>[1]</sup>。组织的核心功能不是控制行为，而是**塑造决策前提（decision premises）**。组织通过以下方式影响成员的决策：

- **权威（authority）**：指定谁有权做出某类决策。
- **沟通渠道（communication channels）**：决定信息的流向。
- **组织认同（organizational identification）**：影响成员在面临选择时偏向哪种目标。
- **培训和灌输（training and indoctrination）**：预先建立决策习惯和价值观。

### 7.2 多 Agent 系统作为虚拟组织

将这个框架应用到多 Agent 系统，可以得到一套组织性的设计原则：

**（a）Agent 间的「系统提示」即「组织文化」。** 共享的系统提示（或 `CLAUDE.md` 文件）为所有 Agent 建立了统一的决策前提，就像组织文化为所有成员提供了共同的价值观基础。

**（b）工具权限即组织权威。** 不同 Agent 能调用哪些工具，本质上定义了它们在组织中的「权限范围」。一个只有读取权限的 Agent 和一个有写入权限的 Agent，在组织层级中扮演着不同的角色——前者是分析师，后者是执行者。

**（c）Agent 间通信协议即组织的沟通渠道设计。** 西蒙指出，沟通渠道的设计深刻地影响着组织的决策质量和速度<sup>[1]</sup>。在多 Agent 系统中，Agent 之间如何传递信息（全文 vs. 摘要、同步 vs. 异步、广播 vs. 点对点）是影响系统性能的关键架构决策。

**（d）专业化与协调的权衡。** 西蒙描述的组织设计核心困境——**专业化（specialization）带来效率提升，但也带来协调成本增加**——在多 Agent 系统中同样存在。增加专业化 Agent（如专门的代码审查 Agent、测试 Agent、文档 Agent）可以提升单项任务的质量，但也增加了 Agent 间的协调开销。西蒙的理论建议：**专业化的边界应当沿着信息依赖关系的自然裂缝来划分**——即回到近似可分解性原则。

### 7.3 March-Simon 模型与 Agent 的动机设计

James March 和西蒙在 1958 年合著的《组织》（*Organizations*）中提出了一个关于组织成员行为的模型<sup>[14]</sup>：成员参与组织的决策取决于**诱因（inducements）**和**贡献（contributions）**的平衡。

虽然 AI Agent 没有「动机」，但这个框架对 Agent 系统的资源分配有启示：

- **诱因**可以类比为分配给 Agent 的**计算资源**（token 预算、工具访问权）。
- **贡献**可以类比为 Agent 对系统目标的**信息贡献**。
- 系统应当根据 Agent 的信息贡献动态调整其资源分配——高价值输出的 Agent 获得更多的计算预算和工具权限。

---

## 八、结论：西蒙的遗产与 Agent 的未来

### 8.1 被遗忘的先知

西蒙的理论之所以对当代 Agent 设计如此相关，是因为他研究的不是某种特定技术，而是**智能行为在有限资源约束下的一般性结构**。无论智能的载体是人类大脑、符号推理程序还是大语言模型，以下约束都是不可逃避的：

1. 信息获取是有成本的。
2. 计算能力是有限的。
3. 注意力是稀缺资源。
4. 复杂系统需要层级结构来管理复杂性。
5. 搜索需要启发式来保持可行性。
6. 满意化通常优于最大化。

### 8.2 未被充分挖掘的理论资源

当前 Agent 研究社区在大量引用计算机科学文献的同时，对西蒙的跨学科贡献的引用明显不足。以下几个方向值得深入探索：

1. **满意化理论的形式化应用**：为 Agent 设计可配置的 aspiration level 和自适应停止规则，而非依赖固定的最大轮次或 token 限制。
2. **近似可分解性的定量分析**：开发度量方法来评估任务分解方案的「可分解性」，并据此优化多 Agent 的通信拓扑。
3. **注意力经济学的上下文管理**：将信息论和注意力分配理论引入 RAG 和上下文管理策略的设计。
4. **人工科学框架下的 Agent 评估**：将 Agent 性能评估从「内部能力测试」转向「内部-外部匹配度评估」——同一个 Agent 在不同环境（工具集、提示词、反馈机制）中的表现差异，可能比不同 Agent 在同一环境中的表现差异更大。

### 8.3 有限理性的机器

让我以西蒙自己的话来结束这篇文章。在 1996 年的一次访谈中，西蒙说<sup>[15]</sup>：

> *「如果我们在建造智能机器的道路上取得进展，那是因为我们终于开始认真对待'有限'这个词了——不是把它当作需要克服的障碍，而是当作需要适应的基本条件。」*

当代 AI Agent 是人类制造的第一批真正意义上的「有限理性的机器」。它们与人类决策者面临同样类型的约束——有限的信息、有限的计算、有限的注意力。西蒙用毕生精力研究的理论框架，为我们理解和改进这些机器提供了一个被严重低估的知识宝库。

在 Agent 系统的设计中拥抱有限性，而非对抗有限性——这或许是西蒙留给 AI 时代最重要的遗产。

---

## 参考文献

[1] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. Macmillan. (第四版: 1997, Free Press)

[2] Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the Middle: How Language Models Use Long Contexts. *Transactions of the Association for Computational Linguistics*, 12, 157–173.

[3] Simon, H. A. (1971). Designing Organizations for an Information-Rich World. In M. Greenberger (Ed.), *Computers, Communications, and the Public Interest* (pp. 37–72). Johns Hopkins Press.

[4] Newell, A., & Simon, H. A. (1972). *Human Problem Solving*. Prentice-Hall.

[5] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. In *ICLR 2023*.

[6] Simon, H. A. (1990). Invariants of Human Behavior. *Annual Review of Psychology*, 41, 1–19.

[7] Chase, W. G., & Simon, H. A. (1973). Perception in Chess. *Cognitive Psychology*, 4(1), 55–81.

[8] Simon, H. A. (1962). The Architecture of Complexity. *Proceedings of the American Philosophical Society*, 106(6), 467–482.

[9] Xu, B., Peng, Z., Lei, B., Mukherjee, S., Liu, Y., & Xu, D. (2023). ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models. *arXiv preprint arXiv:2305.18323*.

[10] Simon, H. A. (1969). *The Sciences of the Artificial*. MIT Press. (第三版: 1996)

[11] Newell, A. (1990). *Unified Theories of Cognition*. Harvard University Press.

[12] Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. In *NeurIPS 2023*.

[13] Wang, G., Xie, Y., Jiang, Y., Mandlekar, A., Xiao, C., Zhu, Y., Fan, L., & Anandkumar, A. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models. *arXiv preprint arXiv:2305.16291*.

[14] March, J. G., & Simon, H. A. (1958). *Organizations*. Wiley.

[15] Simon, H. A. (1996). Interview in *Computational Intelligence*, 12(2), 205–216.

</div>

<div class="lang-en" markdown="1">

> *"A man's rationality is bounded — bounded knowledge, bounded computational capacity, bounded attention. Under these constraints, people do not seek the optimal solution but rather a solution that is 'good enough.'"*
> *— Herbert A. Simon, Administrative Behavior (1947)*

---

Since 2024, AI Agents have become the central paradigm for large language model (LLM) applications. From OpenAI's Function Calling to Anthropic's Tool Use, from AutoGPT to Claude Code, the word "Agent" appears in virtually every AI applications paper and every product launch. Yet when we strip away the technical hype and examine carefully the core challenges facing today's Agent systems — limited context windows, unstable planning capabilities, difficulties in multi-agent coordination, and knowing when to stop searching — we find that nearly all of these problems were systematically studied by one scholar more than half a century ago.

That scholar is Herbert Alexander Simon (1916–2001).

Simon was one of the twentieth century's rare interdisciplinary giants: winner of the 1978 Nobel Prize in Economics and the 1975 Turing Award, he made foundational contributions to political science, psychology, management, artificial intelligence, and cognitive science. His central idea — **bounded rationality** — not only reshaped economics and organizational theory but directly gave rise to several core concepts in modern AI.

This article attempts to systematically survey six theoretical modules in Simon's intellectual system that are most directly relevant to contemporary AI Agent design, to analyze what each module implies for Agent architecture, and to identify which design decisions in current mainstream Agent frameworks are, in essence, (conscious or unconscious) responses to Simon's ideas.

---

## I. Bounded Rationality: The First Principle of Agent Design

### 1.1 From "Economic Man" to "Administrative Man"

Simon's central contribution to economics was a systematic critique of the neoclassical "fully rational economic man" assumption. In his 1947 doctoral dissertation *Administrative Behavior*, Simon argued that real-world decision-makers face three fundamental constraints<sup>[1]</sup>:

1. **Information constraints**: Decision-makers cannot obtain all relevant information.
2. **Computational constraints**: Even when information is available, decision-makers lack sufficient computational capacity to process all of it.
3. **Attention constraints**: Human attention is a scarce resource; one cannot attend to all dimensions simultaneously.

Consequently, decision-makers do not **maximize utility** but rather **satisfice** — they search for a solution that meets a minimally acceptable standard and then stop searching.

### 1.2 LLM Agents as Perfect Instances of Bounded Rationality

The correspondence between this theoretical framework and contemporary LLM Agents is almost strikingly precise:

| Simon's Bounded Rationality Constraints | LLM Agent's Corresponding Constraints | Concrete Manifestations |
|---|---|---|
| Information constraints | **Limited context window** | Claude 200K tokens, GPT-4 128K tokens — anything beyond is "forgotten" |
| Computational constraints | **Limited computational budget per inference** | Inference time, token generation rate, and depth of chain reasoning are all constrained |
| Attention constraints | **Effectively limited range of the attention mechanism** | The "lost-in-the-middle" problem<sup>[2]</sup> — information in the middle of long contexts is ignored |

Liu et al. (2024) empirically demonstrated in their "Lost in the Middle" study that the attention distribution of LLMs follows a U-shaped curve: models are significantly more sensitive to information at the beginning and end of the context than to information in the middle<sup>[2]</sup>. This closely parallels the **primacy effect** and **recency effect** in cognitive psychology — phenomena that Simon had already described in the 1950s when studying human information processing.

### 1.3 Implications for Agent Design: Embracing Limitation

The central lesson of Simon's theory is not "how to overcome limitation" but rather **"how to make sufficiently good decisions under the constraints of limitation."** For Agent design, this means:

**(a) Abandon the illusion of global optimality.** Many Agent frameworks attempt to approximate optimal reasoning paths through Chain-of-Thought or Tree-of-Thought. Simon would point out that when the search space grows exponentially, exhaustive search is itself irrational. Truly rational behavior requires **heuristics** for pruning.

**(b) Design explicit stopping rules.** The heart of satisficing theory is **when to stop searching**. Most current Agent frameworks lack clear stopping criteria — they either terminate passively when the token limit is reached or rely on the model's own "judgment." Simon's theory suggests that Agents should have an **explicit aspiration level**: once a solution meeting that level is found, search should stop.

**(c) Context management is attention management.** In his famous 1971 dictum, Simon wrote: "In an information-rich world, the wealth of information means a dearth of something else — a scarcity of whatever it is that information consumes."<sup>[3]</sup> For Agents, the context window *is* attention. Therefore, **the context management strategy — what information to include in the context, what to summarize, what to discard — is one of the most central design decisions in Agent architecture**, not an engineering detail.

---

## II. Satisficing Search and Agent Planning Strategies

### 2.1 Search as the Basic Mechanism of Decision-Making

In their collaboration from the 1950s through the 1970s, Simon and Allen Newell formalized problem-solving as **search through a problem space**<sup>[4]</sup>. Their core framework consists of:

- **Initial state**: The current description of the problem
- **Goal state**: The desired outcome
- **Operators**: Available operations or transformations
- **Search strategy**: The method for selecting and applying operators

This framework maps directly onto the contemporary Agent paradigm of ReAct (Reasoning + Acting)<sup>[5]</sup>:

| Problem Space Concept | Corresponding Agent Concept |
|---|---|
| Initial state | User prompt + current environment state |
| Goal state | Task completion condition |
| Operators | Available tools / function calls |
| Search strategy | LLM reasoning + tool selection logic |

### 2.2 Means-Ends Analysis

The **Means-Ends Analysis (MEA)** proposed by Simon and Newell is their most influential problem-solving strategy<sup>[4]</sup>. The core logic of MEA is:

1. Compare the current state with the goal state and identify the **difference**.
2. Search for an operator that **reduces this difference**.
3. If the preconditions of that operator are not satisfied, **recursively** make satisfying those preconditions a subgoal.

This is essentially the same idea as contemporary Agent **hierarchical planning** and **subgoal decomposition**. For example, when Claude Code receives the instruction "refactor this module," its implicit reasoning process is:

```
Goal: Refactor module X
Current state: Module X contains functions A, B, C with code duplication
Difference: Code duplication, high coupling
Available operators: Read (read files), Edit (edit files), Grep (search patterns), Bash (run tests)
Subgoal 1: Understand the current code structure (operators: Read, Grep)
Subgoal 2: Identify duplicate patterns (operator: Grep)
Subgoal 3: Extract common logic (operator: Edit)
Subgoal 4: Verify correctness of refactoring (operator: Bash → run tests)
```

### 2.3 Heuristic Search and "Good Enough" Tool Selection

Simon repeatedly emphasized that in complex problems, exhaustive search is infeasible — **heuristics are a necessary condition for rational behavior**<sup>[6]</sup>.

This has direct implications for Agent tool selection. A core problem facing current Agents is that as the number of available tools increases, the accuracy of tool selection decreases. This is fundamentally a search-space explosion problem. Simon's theory recommends the following strategies:

1. **Recognition-then-act**: In studying chess grandmasters, Simon found that experts do not play chess by means of deep search but through **pattern recognition** — recognizing patterns on the board and retrieving associated moves from memory<sup>[7]</sup>. For Agents, this implies that rather than having the model reason from scratch about tool selection on each call, it is better to use **few-shot examples** or **fine-tuning** to teach the model a mapping from "task pattern → tool sequence."

2. **Attention filtering**: Not all tool descriptions need to be placed in the context. Pre-filtering relevant tools by task type reduces the search space — this is precisely what Simon called "the economics of attention."

---

## III. Near-Decomposability: The Architectural Principle of Multi-Agent Systems

### 3.1 The Hierarchical Structure of Complex Systems

In his landmark 1962 paper "The Architecture of Complexity," Simon advanced a profound observation: **nearly all complex systems exhibit hierarchical structure, and this hierarchical structure possesses near-decomposability**<sup>[8]</sup>.

Near-decomposability means:

- In the **short run**, the behavior of each subsystem within the overall system is approximately **independent**.
- In the **long run**, the interaction effects between subsystems become significant.
- The intensity of interactions **within** subsystems is far greater than the intensity of interactions **between** subsystems.

Simon used a famous parable to illustrate the evolutionary advantage of hierarchical structure — **the Watchmaker Parable**<sup>[8]</sup>:

> Two watchmakers each assemble a watch containing 1,000 parts. The first assembles all parts in a single sequence; any interruption causes everything to fall apart and must be started over from scratch. The second designs his watch as 10 sub-assemblies, each containing 10 parts, each part comprising 10 components. Even if interrupted, he need only redo one small section at most. The result: the second watchmaker vastly outperforms the first.

### 3.2 Direct Mapping to Multi-Agent Architecture

The near-decomposability theory provides first-principles guidance for multi-agent system design:

**(a) Task decomposition should follow the principle of near-decomposability.** When breaking a large task into subtasks, the decomposition should minimize **information dependencies** between subtasks. This is not an engineering preference but a deep principle from complex systems theory: near-decomposable systems are more robust and more evolvable.

**(b) The communication topology between Agents should match the dependency structure of the task.** If two subtasks are highly independent (near-decomposable in the short run), the Agents responsible for those subtasks need not communicate frequently. Conversely, if two subtasks are tightly coupled, the corresponding Agents should have low-latency communication channels.

**(c) Hierarchical Agent architecture is not a preference but a necessity.** Simon argued for the universality of hierarchical structure in both evolution and engineering. For multi-agent systems, this implies that **purely flat Agent clusters — where all Agents are fully peer-level — are unlikely to be the optimal architecture for complex tasks**. Instead, some form of hierarchy — coordinator Agents plus executor Agents — is nearly unavoidable.

To draw on my own work with the [CivAgent](https://github.com/LeoLin990405/civagent) project as an example: the architectural mapping of 57 historical polities is, in essence, an exploration of different hierarchical structures and decomposition strategies. The Tang Dynasty's Three Departments and Six Ministries system, with its three-level review process, is a strongly hierarchical near-decomposable structure — the Secretariat drafted, the Chancellery deliberated, and the Department of State Affairs executed, each operating approximately independently within its own sphere of responsibility and interacting only through institutionalized interfaces (vetoes, countersignatures).

### 3.3 The Emergence of Intermediate Levels

Simon noted that in near-decomposable systems, **intermediate levels carry special importance**<sup>[8]</sup>. They provide sufficient abstraction to manage complexity while retaining sufficient detail to carry out specific operations.

The implication for Agent systems is that **intermediate abstraction layers** should exist between user requests and low-level tool calls. The problem with many current Agent frameworks is precisely the absence of this intermediate layer — high-level user intent maps directly to low-level tool calls, with no buffering "planning" or "strategy" layer in between. This is analogous to trying to write an operating system directly in assembly language: theoretically possible, but catastrophic for managing complexity.

ReWOO (Xu et al., 2023)<sup>[9]</sup> and the Plan-and-Execute architecture attempt to address this problem by introducing an explicit planning layer between reasoning and execution. From Simon's theoretical perspective, this is the right direction for establishing an "intermediate level" in Agent systems.

---

## IV. The Sciences of the Artificial and Agents as Designed Artifacts

### 4.1 Natural Science vs. The Sciences of the Artificial

In *The Sciences of the Artificial*, published in 1969, Simon advanced an epistemological framework that has been seriously underappreciated<sup>[10]</sup>:

- **Natural science** studies "what things are."
- **The sciences of the artificial (design science)** study "what things ought to be" — that is, how to design artifacts to achieve goals.

The defining characteristic of an artifact is that it serves as an **interface** between an **inner environment** (its own structure and mechanisms) and an **outer environment** (the goals and conditions it must satisfy). The behavior of an artifact depends on the interaction among all three:

```
Outer environment (task requirements, user intent, data)
        ↕  Interface (the Agent's observable behavior)
Inner environment (model architecture, parameters, prompts, toolset)
```

### 4.2 The Interfacial Nature of Agents

This framework has profound implications for Agent design:

**An Agent's "intelligence" is not solely an internal property but the result of the match between its inner and outer environments.** Simon illustrated this point with a famous metaphor: the path an ant traces on a beach appears highly complex, but that complexity derives mainly from the complexity of the beach's surface (the outer environment) rather than from the ant's own complexity (the inner environment)<sup>[10]</sup>.

> "An ant, viewed as a behaving system, is quite simple. The apparent complexity of its behavior over time is largely a reflection of the complexity of the environment in which it finds itself."

By analogy: the "intelligence" an AI Agent exhibits in solving complex programming tasks derives substantially from the **environment** it operates in — the structure of the file system, the organization of the codebase, the interpretability of error messages, the feedback quality of the testing framework. **Consequently, optimizing Agent performance is not solely a matter of optimizing the model itself; it also requires optimizing the environment in which the Agent operates.**

This explains why many of Claude Code's design decisions — such as `CLAUDE.md` files, project-level instructions, and structured tool return values — are fundamentally about **optimizing the outer environment** so that it better matches the Agent's inner capabilities. Similarly, the core value of MCP (Model Context Protocol) lies in **standardizing the interface between Agents and their outer environment**.

### 4.3 Adaptive Behavior and Environment Design

Simon's theory of the sciences of the artificial also implies an important design principle: **rather than trying to build a universal Agent that performs well in all environments, design the environment to match the task category.** This is directly relevant to the ongoing "generalist vs. specialist" debate in the Agent field.

From Simon's perspective, Agent specialization need not reside in the specialization of model parameters; it may instead reside in the specialization of the **toolset, context templates, and evaluation criteria** — that is, the specialization of the outer environment. A "coding Agent" and a "writing Agent" may use exactly the same underlying model but be equipped with different tools, different system prompts, and different stopping criteria.

---

## V. The Economics of Attention and Context Window Management

### 5.1 The Prophecy of Information Overload

In a 1971 lecture, Simon advanced one of his most prescient observations<sup>[3]</sup>:

> *"In an information-rich world, the wealth of information means a dearth of something else: a scarcity of whatever it is that information consumes. What information consumes is rather obvious: it consumes the attention of its recipients. Hence a wealth of information creates a poverty of attention and a need to allocate that attention efficiently among the overabundance of information sources that might consume it."*

These words were written thirty years before the widespread adoption of the internet, yet their applicability to contemporary Agent systems is remarkable.

### 5.2 The Context Window as an Attentional Resource

For LLM Agents, **the context window is the attentional resource**. It is finite, non-renewable within a single inference, and the distribution of information within it directly affects the quality of the Agent's decisions.

Simon's economics-of-attention theory yields the following design principles for context management:

**(a) The value of information lies not in its content but in its marginal contribution to the decision at hand.** This means context management strategies should rank information by its **decision-relevance**, not by its temporal order or the importance of its source. An error log highly relevant to the current subtask carries far more context value than a detailed but presently irrelevant description of system architecture.

**(b) Attention allocation should match the phase of the task.** During the planning phase, the Agent needs macro-level information (project structure, requirements); during the execution phase, it needs micro-level information (specific code, API documentation). The content of the context should **dynamically adjust** as the task progresses through its phases.

**(c) Summarization is the core mechanism of attention management.** Simon noted that information passing upward through hierarchical organizations inevitably undergoes summarization and abstraction<sup>[1]</sup>. By analogy, as an Agent's context approaches the window limit, detailed information from earlier in the conversation should be **replaced by summaries**, retaining only the key conclusions that bear on subsequent decisions. This is precisely the theoretical basis for Claude Code's automatic message compression when conversations approach the context limit.

### 5.3 The Illusion of "Sufficient Information"

Simon's theory also warns against a common Agent design trap: **attempting to pack all potentially relevant information into the context**. This approach appears to be "giving the Agent more information" but may actually **reduce** decision quality — because critical information gets buried in an ocean of irrelevant content.

This is directly relevant to a common problem in RAG (Retrieval-Augmented Generation) systems. Simply increasing the number of retrieved passages (top-k) does not always improve answer quality, because more retrieved results means more competition for attention. Simon's theory suggests: **the central challenge for RAG systems is not to retrieve more information, but to retrieve less — yet more relevant — information.**

---

## VI. Production Systems and the Cognitive Architecture of Agents

### 6.1 From GPS to Production Systems

The **General Problem Solver (GPS)**, developed by Simon and Newell in 1957, was the first program in AI history to explicitly simulate human problem-solving processes<sup>[4]</sup>. GPS used means-ends analysis to search problem spaces, and its architecture was based on **production rules**:

```
IF  current state matches condition C
THEN  execute action A
```

A set of such IF-THEN rules constitutes a **production system**<sup>[11]</sup>. Newell later developed this idea into the more complete cognitive architecture theories of ACT-R and SOAR, which remain among the most influential computational models in cognitive science.

### 6.2 The Production System Legacy in Contemporary Agent Frameworks

The shadow of production systems is visible throughout contemporary Agent frameworks:

| Production System Concept | Contemporary Agent Counterpart |
|---|---|
| Production rules (IF-THEN) | Conditional instructions in system prompts ("If the user requests X, use tool Y") |
| Working memory | Context window |
| Long-term memory | RAG, vector databases, external knowledge stores |
| Conflict resolution | Priority logic when multiple instructions apply |
| Goal stack | The queue of subgoals following task decomposition |

### 6.3 The Modern Revival of Cognitive Architecture

It is worth noting that many concepts presented as "innovations" in current Agent research — such as the self-reflection mechanism in Reflexion (Shinn et al., 2023)<sup>[12]</sup> and the skill library in Voyager (Wang et al., 2023)<sup>[13]</sup> — bear deep structural correspondences to mechanisms that Simon and Newell studied in cognitive architecture decades earlier:

- **Reflexion's self-reflection** ≈ **impasse detection + chunking** in the SOAR architecture: when an Agent encounters an obstacle, it reviews the reasons for failure and generates new rules.
- **Voyager's skill library** ≈ **procedural memory** in ACT-R: successful action sequences are stored as reusable procedures.
- **MemGPT's hierarchical memory** ≈ the **interaction between short-term and long-term memory** in human cognition as described by Simon.

This is not coincidence. Simon and Newell were studying the **general structure of intelligent behavior**, and contemporary Agent systems — regardless of whether their underlying technology is symbolic reasoning or neural networks — inevitably face the same structural problems.

---

## VII. Organizational Theory and Multi-Agent Coordination

### 7.1 Organizations as Information-Processing Systems

In *Administrative Behavior* and subsequent works, Simon conceived of organizations as **information-processing systems**<sup>[1]</sup>. The core function of an organization is not to control behavior but to **shape decision premises**. Organizations influence members' decisions through:

- **Authority**: Specifying who has the right to make which kinds of decisions.
- **Communication channels**: Determining the flow of information.
- **Organizational identification**: Influencing which goals members favor when facing choices.
- **Training and indoctrination**: Pre-establishing decision habits and values.

### 7.2 Multi-Agent Systems as Virtual Organizations

Applying this framework to multi-agent systems yields a set of organizational design principles:

**(a) The shared system prompt is the "organizational culture."** A shared system prompt (or `CLAUDE.md` file) establishes unified decision premises for all Agents, just as organizational culture provides a common value foundation for all members.

**(b) Tool permissions are organizational authority.** Which tools different Agents can invoke essentially defines their "scope of authority" within the organization. An Agent with read-only access and one with write access play different roles in the organizational hierarchy — the former is an analyst, the latter an executor.

**(c) Inter-agent communication protocols are the design of organizational communication channels.** Simon observed that the design of communication channels profoundly affects both the quality and speed of organizational decisions<sup>[1]</sup>. In multi-agent systems, how Agents pass information to one another — full text vs. summary, synchronous vs. asynchronous, broadcast vs. point-to-point — is a critical architectural decision affecting overall system performance.

**(d) The trade-off between specialization and coordination.** The core dilemma of organizational design that Simon described — **specialization brings efficiency gains but also increases coordination costs** — exists equally in multi-agent systems. Adding specialized Agents (e.g., a dedicated code-review Agent, a testing Agent, a documentation Agent) can improve the quality of individual tasks but also increases inter-agent coordination overhead. Simon's theory suggests: **the boundaries of specialization should be drawn along the natural fault lines of information dependencies** — which brings us back to the principle of near-decomposability.

### 7.3 The March-Simon Model and Agent Incentive Design

In *Organizations* (1958), co-authored with James March, Simon advanced a model of organizational member behavior<sup>[14]</sup>: a member's participation in an organization depends on the balance between **inducements** and **contributions**.

Although AI Agents have no "motivations," this framework has implications for resource allocation in Agent systems:

- **Inducements** can be analogized to the **computational resources** allocated to an Agent (token budget, tool access).
- **Contributions** can be analogized to an Agent's **informational contribution** to system goals.
- The system should dynamically adjust resource allocation based on each Agent's informational contribution — Agents producing high-value outputs receive larger computational budgets and broader tool permissions.

---

## VIII. Conclusion: Simon's Legacy and the Future of Agents

### 8.1 The Forgotten Prophet

The reason Simon's theories are so relevant to contemporary Agent design is that he was not studying any particular technology but rather **the general structure of intelligent behavior under constraints of limited resources**. Whether the vehicle of intelligence is the human brain, a symbolic reasoning program, or a large language model, the following constraints are inescapable:

1. Acquiring information has costs.
2. Computational capacity is finite.
3. Attention is a scarce resource.
4. Complex systems require hierarchical structure to manage complexity.
5. Search requires heuristics to remain feasible.
6. Satisficing is usually superior to maximizing.

### 8.2 An Underutilized Theoretical Resource

While the current Agent research community cites computer science literature extensively, it draws notably little on Simon's interdisciplinary contributions. The following directions merit deeper exploration:

1. **Formal application of satisficing theory**: Designing configurable aspiration levels and adaptive stopping rules for Agents, rather than relying on fixed maximum turn counts or token limits.
2. **Quantitative analysis of near-decomposability**: Developing metrics to evaluate the "decomposability" of task decomposition schemes and using them to optimize multi-agent communication topologies.
3. **Context management through the economics of attention**: Bringing information theory and attention allocation theory to bear on the design of RAG and context management strategies.
4. **Agent evaluation under the sciences-of-the-artificial framework**: Shifting Agent performance evaluation from "internal capability testing" to "inner-outer match evaluation" — the performance difference of the same Agent across different environments (toolsets, prompts, feedback mechanisms) may well exceed the performance difference between different Agents in the same environment.

### 8.3 Machines of Bounded Rationality

Let me close with Simon's own words. In a 1996 interview, Simon said<sup>[15]</sup>:

> *"If we have made progress on the road to building intelligent machines, it is because we have finally begun to take the word 'bounded' seriously — not as an obstacle to be overcome, but as a fundamental condition to be adapted to."*

Contemporary AI Agents are the first machines of genuine "bounded rationality" that humanity has built. They face the same categories of constraints as human decision-makers — limited information, limited computation, limited attention. The theoretical framework that Simon devoted his life to studying offers a profoundly underutilized intellectual resource for understanding and improving these machines.

To embrace limitation in the design of Agent systems, rather than to resist it — this may be the most important legacy Simon has left for the age of AI.

---

## References

[1] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. Macmillan. (4th ed.: 1997, Free Press)

[2] Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the Middle: How Language Models Use Long Contexts. *Transactions of the Association for Computational Linguistics*, 12, 157–173.

[3] Simon, H. A. (1971). Designing Organizations for an Information-Rich World. In M. Greenberger (Ed.), *Computers, Communications, and the Public Interest* (pp. 37–72). Johns Hopkins Press.

[4] Newell, A., & Simon, H. A. (1972). *Human Problem Solving*. Prentice-Hall.

[5] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. In *ICLR 2023*.

[6] Simon, H. A. (1990). Invariants of Human Behavior. *Annual Review of Psychology*, 41, 1–19.

[7] Chase, W. G., & Simon, H. A. (1973). Perception in Chess. *Cognitive Psychology*, 4(1), 55–81.

[8] Simon, H. A. (1962). The Architecture of Complexity. *Proceedings of the American Philosophical Society*, 106(6), 467–482.

[9] Xu, B., Peng, Z., Lei, B., Mukherjee, S., Liu, Y., & Xu, D. (2023). ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models. *arXiv preprint arXiv:2305.18323*.

[10] Simon, H. A. (1969). *The Sciences of the Artificial*. MIT Press. (3rd ed.: 1996)

[11] Newell, A. (1990). *Unified Theories of Cognition*. Harvard University Press.

[12] Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. In *NeurIPS 2023*.

[13] Wang, G., Xie, Y., Jiang, Y., Mandlekar, A., Xiao, C., Zhu, Y., Fan, L., & Anandkumar, A. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models. *arXiv preprint arXiv:2305.16291*.

[14] March, J. G., & Simon, H. A. (1958). *Organizations*. Wiley.

[15] Simon, H. A. (1996). Interview in *Computational Intelligence*, 12(2), 205–216.

</div>
