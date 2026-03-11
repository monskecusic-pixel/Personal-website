// --- Initial Data ---
const DEFAULT_DATA = {
    articles: [
        {
            title: "GPT-5 发布：多模态能力再升级",
            source: "机器之心",
            date: "2026-03-10",
            summary: "OpenAI 最新发布的 GPT-5 在推理能力和多模态理解上取得了突破性进展，不仅能处理文本和图像，还能实时理解视频内容...",
            link: "https://openai.com/blog",
            type: "industry"
        },
        {
            title: "AI 训练师人才缺口扩大",
            source: "雷锋网",
            date: "2026-03-09",
            summary: "随着大模型应用落地的加速，具备数据清洗、Prompt 工程和 RLHF 经验的 AI 训练师成为企业争抢的热门人才...",
            link: "https://www.leiphone.com/",
            type: "industry"
        },
        {
            title: "Sora 2.0 公测开启：电影级视频生成",
            source: "机器之心",
            date: "2026-03-08",
            summary: "Sora 2.0 带来了更长的视频生成时长和更精准的物理模拟能力，将彻底改变影视制作和广告创意行业的工作流...",
            link: "https://openai.com/sora",
            type: "industry"
        },
        {
            title: "如何高效构建高质量的 SFT 数据集",
            source: "原创文章",
            date: "2026-02-20",
            summary: "在微调大模型时，数据质量远比数量重要。本文分享我在构建指令微调数据集时的实战经验和清洗策略...",
            link: "#",
            type: "personal"
        }
    ],
    tools: [
        {
            name: "Claude 3 Opus / Sonnet",
            desc: "主要用于长文本分析、代码生成及复杂逻辑推理任务。",
            link: "https://claude.ai"
        },
        {
            name: "飞书多维表格 (Feishu Base)",
            desc: "用于构建数据标注工作流、任务分发及进度管理系统。",
            link: "https://www.feishu.cn/product/base"
        },
        {
            name: "Prompt Engineering Toolkit",
            desc: "自研提示词优化工具，支持 A/B 测试与版本管理。",
            link: "#"
        },
        {
            name: "Label Studio",
            desc: "开源数据标注平台，用于文本分类、NER 及图像标注任务。",
            link: "https://labelstud.io/"
        }
    ],
    workflows: [
        {
            title: "AI 资讯自动抓取与摘要",
            source: "自动化流程",
            summary: "基于 Python + OpenAI API 的每日资讯自动抓取脚本，自动生成摘要并推送至飞书群。",
            link: "downloads/news_script.py"
        },
        {
            title: "大模型数据清洗 SOP",
            source: "SOP",
            summary: "包含数据去重、敏感词过滤、格式规范化等步骤的完整标准操作程序文档。",
            link: "downloads/data_sop.md"
        }
    ],
    career: {
        jobTitle: "AI 训练师 / AI 产品经理",
        skills: [
            "大模型标注规则设计",
            "Prompt 工程",
            "数据质量管控",
            "RLHF 反馈机制",
            "Python 数据处理",
            "评测集构建"
        ],
        projects: [
            {
                title: "通用大模型指令微调 (SFT)",
                role: "项目经历",
                summary: "负责构建包含 10 万条高质量指令的 SFT 数据集，覆盖代码生成、逻辑推理等 10+ 个垂直领域。制定详细的标注规范，团队标注准确率提升至 98%。"
            },
            {
                title: "医疗领域模型 RLHF 偏好标注",
                role: "项目经历",
                summary: "设计医疗场景下的 Reward Model 偏好标注标准，针对幻觉问题进行专项优化。通过多轮迭代，模型在医疗问答任务上的可用性显著提升。"
            }
        ]
    }
};

// --- Main Init ---
document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();
    setupEventListeners();
    
    // Load persisted data
    loadArticles();
    loadTools();
    loadWorkflows();
    loadCareerData();
    loadProjects();
});

function initLocalStorage() {
    if (!localStorage.getItem('myArticles')) {
        localStorage.setItem('myArticles', JSON.stringify(DEFAULT_DATA.articles));
    }
    if (!localStorage.getItem('myTools')) {
        localStorage.setItem('myTools', JSON.stringify(DEFAULT_DATA.tools));
    }
    if (!localStorage.getItem('myWorkflows')) {
        localStorage.setItem('myWorkflows', JSON.stringify(DEFAULT_DATA.workflows));
    }
    if (!localStorage.getItem('myCareerData')) {
        localStorage.setItem('myCareerData', JSON.stringify(DEFAULT_DATA.career));
    }
}

function setupEventListeners() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Floating Bar Close
    const floatingBar = document.querySelector('.floating-bar');
    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn && floatingBar) {
        closeBtn.addEventListener('click', () => {
            floatingBar.style.display = 'none';
        });
    }
}

// --- Helper: Render Delete Button ---
function createDeleteBtn(onclickFn) {
    const btn = document.createElement('button');
    btn.innerHTML = '&times;';
    btn.className = 'delete-btn';
    btn.onclick = (e) => {
        e.stopPropagation(); // Prevent card click
        onclickFn();
    };
    return btn;
}

// --- Articles Logic ---
function saveNewArticle() {
    const title = document.getElementById('newArticleTitle').value;
    const source = document.getElementById('newArticleSource').value;
    const date = document.getElementById('newArticleDate').value;
    const summary = document.getElementById('newArticleSummary').value;
    const link = document.getElementById('newArticleLink').value || '#';

    if (!title || !source) {
        alert('请填写标题和来源');
        return;
    }

    const article = { title, source, date, summary, link, type: 'personal' };
    let articles = JSON.parse(localStorage.getItem('myArticles') || '[]');
    articles.unshift(article); // Add to top
    localStorage.setItem('myArticles', JSON.stringify(articles));

    document.getElementById('addArticleModal').style.display = 'none';
    document.getElementById('newArticleTitle').value = '';
    document.getElementById('newArticleSummary').value = '';
    
    loadArticles();
}

function loadArticles() {
    // 1. Industry News
    const industryGrid = document.getElementById('industryNewsGrid');
    if (industryGrid) {
        industryGrid.innerHTML = '';
        const articles = JSON.parse(localStorage.getItem('myArticles') || '[]');
        const industryArticles = articles.filter(a => a.type === 'industry');
        
        industryArticles.forEach(article => {
            const card = createNewsCard(article);
            // Optional: allow deleting industry news too? User asked "cannot delete articles", implying all.
            const delBtn = createDeleteBtn(() => deleteArticle(article.title));
            card.style.position = 'relative';
            card.appendChild(delBtn);
            industryGrid.appendChild(card);
        });
    }

    // 2. Personal Articles
    const personalGrid = document.getElementById('personalArticlesGrid');
    if (personalGrid) {
        // Clear dynamic content but keep the "Add" button if it's there
        // Actually, let's just clear and rebuild everything including the Add button to keep order correct
        personalGrid.innerHTML = '';
        
        const articles = JSON.parse(localStorage.getItem('myArticles') || '[]');
        const personalArticles = articles.filter(a => a.type === 'personal');

        personalArticles.forEach(article => {
            const card = createNewsCard(article);
            card.style.borderColor = 'var(--accent-color)';
            const delBtn = createDeleteBtn(() => deleteArticle(article.title));
            card.style.position = 'relative';
            card.appendChild(delBtn);
            personalGrid.appendChild(card);
        });

        // Re-append "Add Article" card
        const addCard = document.createElement('div');
        addCard.className = 'news-card add-card';
        addCard.onclick = () => document.getElementById('addArticleModal').style.display = 'flex';
        addCard.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: #666;">+ 添加新文章</h3>
                <p style="color: #666; font-size: 0.8rem;">点击添加自定义文章</p>
            </div>
        `;
        personalGrid.appendChild(addCard);
    }
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
        <div class="news-source">${article.source}</div>
        <div class="news-date">${article.date}</div>
        <h3>${article.title}</h3>
        <p class="news-summary">${article.summary}</p>
        <a href="${article.link}" target="_blank" class="read-more">阅读全文 &rarr;</a>
    `;
    return card;
}

function deleteArticle(title) {
    if(confirm('确定删除这篇文章吗？')) {
        let articles = JSON.parse(localStorage.getItem('myArticles') || '[]');
        articles = articles.filter(a => a.title !== title);
        localStorage.setItem('myArticles', JSON.stringify(articles));
        loadArticles();
    }
}

// --- Tools Logic ---
function saveNewTool() {
    const name = document.getElementById('newToolName').value;
    const desc = document.getElementById('newToolDesc').value;
    const link = document.getElementById('newToolLink').value || '#';

    if (!name) {
        alert('请填写工具名称');
        return;
    }

    const tool = { name, desc, link };
    let tools = JSON.parse(localStorage.getItem('myTools') || '[]');
    tools.push(tool);
    localStorage.setItem('myTools', JSON.stringify(tools));

    document.getElementById('addToolModal').style.display = 'none';
    document.getElementById('newToolName').value = '';
    document.getElementById('newToolDesc').value = '';
    
    loadTools();
}

function loadTools() {
    const list = document.getElementById('toolsList');
    if (!list) return;

    list.innerHTML = '';
    const tools = JSON.parse(localStorage.getItem('myTools') || '[]');

    tools.forEach(tool => {
        const item = document.createElement('div');
        item.className = 'tool-item';
        item.style.position = 'relative';
        item.innerHTML = `
            <div class="tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.desc}</p>
            </div>
            <div class="tool-actions">
                <a href="${tool.link}" target="_blank" class="btn-small">查看详情</a>
            </div>
        `;
        const delBtn = createDeleteBtn(() => deleteTool(tool.name));
        delBtn.style.top = '10px';
        delBtn.style.right = '10px';
        item.appendChild(delBtn);
        list.appendChild(item);
    });
}

function deleteTool(name) {
    if(confirm('确定删除这个工具吗？')) {
        let tools = JSON.parse(localStorage.getItem('myTools') || '[]');
        tools = tools.filter(t => t.name !== name);
        localStorage.setItem('myTools', JSON.stringify(tools));
        loadTools();
    }
}

// --- Workflows Logic ---
function loadWorkflows() {
    const grid = document.getElementById('workflowGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const workflows = JSON.parse(localStorage.getItem('myWorkflows') || '[]');

    workflows.forEach(wf => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.position = 'relative';
        card.innerHTML = `
            <div class="news-source">${wf.source}</div>
            <h3>${wf.title}</h3>
            <p class="news-summary">${wf.summary}</p>
            <a href="${wf.link}" download class="read-more">下载 &darr;</a>
        `;
        const delBtn = createDeleteBtn(() => deleteWorkflow(wf.title));
        card.appendChild(delBtn);
        grid.appendChild(card);
    });

    // Add Import Card
    const addCard = document.createElement('div');
    addCard.className = 'news-card add-card';
    addCard.onclick = () => document.getElementById('workflowInput').click();
    addCard.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #666;">+ 导入工作流</h3>
            <p style="color: #666; font-size: 0.8rem;">支持 .json / .yaml 文件</p>
            <input type="file" id="workflowInput" style="display:none" onchange="handleWorkflowImport(this)">
        </div>
    `;
    grid.appendChild(addCard);
}

function handleWorkflowImport(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const newWorkflow = {
            title: file.name,
            source: "导入的工作流",
            summary: `从本地导入的文件: ${file.name} (${(file.size/1024).toFixed(1)}KB)`,
            link: "#" // In a real app, this would be an uploaded URL
        };

        let workflows = JSON.parse(localStorage.getItem('myWorkflows') || '[]');
        workflows.push(newWorkflow);
        localStorage.setItem('myWorkflows', JSON.stringify(workflows));
        
        alert(`成功导入: ${file.name}`);
        loadWorkflows();
    }
}

function deleteWorkflow(title) {
    if(confirm('确定删除这个工作流吗？')) {
        let workflows = JSON.parse(localStorage.getItem('myWorkflows') || '[]');
        workflows = workflows.filter(w => w.title !== title);
        localStorage.setItem('myWorkflows', JSON.stringify(workflows));
        loadWorkflows();
    }
}

// --- Career Logic ---
function saveCareerData() {
    const jobTitle = document.getElementById('jobTitle').innerText;
    const skillsList = document.getElementById('skillsList');
    const skills = [];
    
    if (skillsList) {
        skillsList.querySelectorAll('li span.skill-text').forEach(span => {
            skills.push(span.innerText);
        });
    }
    
    // We need to preserve projects when saving skills/title
    const currentData = JSON.parse(localStorage.getItem('myCareerData') || '{}');
    const careerData = { 
        jobTitle, 
        skills, 
        projects: currentData.projects || DEFAULT_DATA.career.projects 
    };
    
    localStorage.setItem('myCareerData', JSON.stringify(careerData));
}

function loadCareerData() {
    const data = JSON.parse(localStorage.getItem('myCareerData'));
    if (!data) return;

    // Job Title
    const jobTitleEl = document.getElementById('jobTitle');
    if (jobTitleEl && data.jobTitle) {
        jobTitleEl.innerText = data.jobTitle;
    }

    // Skills
    const skillsListEl = document.getElementById('skillsList');
    if (skillsListEl && data.skills) {
        skillsListEl.innerHTML = '';
        data.skills.forEach((skill, index) => {
            const li = document.createElement('li');
            li.style.position = 'relative';
            li.style.paddingRight = '25px'; // Space for X button
            
            const span = document.createElement('span');
            span.className = 'skill-text';
            span.innerText = skill;
            span.contentEditable = "true";
            span.onblur = saveCareerData;
            
            // Small delete X
            const delSpan = document.createElement('span');
            delSpan.innerHTML = '&times;';
            delSpan.style.position = 'absolute';
            delSpan.style.right = '5px';
            delSpan.style.top = '50%';
            delSpan.style.transform = 'translateY(-50%)';
            delSpan.style.cursor = 'pointer';
            delSpan.style.color = '#ff4444';
            delSpan.style.fontWeight = 'bold';
            delSpan.onclick = () => deleteSkill(index);

            li.appendChild(span);
            li.appendChild(delSpan);
            skillsListEl.appendChild(li);
        });
    }
}

function addNewSkill() {
    const data = JSON.parse(localStorage.getItem('myCareerData'));
    if (!data) return;
    
    data.skills.push("新技能");
    localStorage.setItem('myCareerData', JSON.stringify(data));
    loadCareerData();
}

function deleteSkill(index) {
    const data = JSON.parse(localStorage.getItem('myCareerData'));
    if (!data) return;
    
    data.skills.splice(index, 1);
    localStorage.setItem('myCareerData', JSON.stringify(data));
    loadCareerData();
}

// --- Projects Logic ---
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const data = JSON.parse(localStorage.getItem('myCareerData'));
    const projects = data ? (data.projects || []) : [];

    projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.position = 'relative';
        card.innerHTML = `
            <div class="news-source">${proj.role}</div>
            <h3 contenteditable="true" onblur="updateProject(${index}, 'title', this.innerText)">${proj.title}</h3>
            <p class="news-summary" contenteditable="true" onblur="updateProject(${index}, 'summary', this.innerText)">${proj.summary}</p>
        `;
        
        const delBtn = createDeleteBtn(() => deleteProject(index));
        card.appendChild(delBtn);
        grid.appendChild(card);
    });

    // Add Project Card
    const addCard = document.createElement('div');
    addCard.className = 'news-card add-card';
    addCard.onclick = addNewProject;
    addCard.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #666;">+ 添加项目经历</h3>
            <p style="color: #666; font-size: 0.8rem;">点击添加</p>
        </div>
    `;
    grid.appendChild(addCard);
}

function addNewProject() {
    const data = JSON.parse(localStorage.getItem('myCareerData'));
    if (!data) return;

    if (!data.projects) data.projects = [];
    data.projects.push({
        title: "新项目 (点击标题编辑)",
        role: "项目经历",
        summary: "点击此处编辑项目描述..."
    });
    
    localStorage.setItem('myCareerData', JSON.stringify(data));
    loadProjects();
}

function updateProject(index, field, value) {
    const data = JSON.parse(localStorage.getItem('myCareerData'));
    if (!data || !data.projects[index]) return;
    
    data.projects[index][field] = value;
    localStorage.setItem('myCareerData', JSON.stringify(data));
}

function deleteProject(index) {
    if(confirm('确定删除这个项目经历吗？')) {
        const data = JSON.parse(localStorage.getItem('myCareerData'));
        if (!data) return;
        
        data.projects.splice(index, 1);
        localStorage.setItem('myCareerData', JSON.stringify(data));
        loadProjects();
    }
}
