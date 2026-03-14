export interface FileTreeNode {
	id: string;
	name: string;
	type: "folder" | "file";
	count?: number;
	workflow?: "Manual" | "Automatic";
	children?: FileTreeNode[];
	link?: string;
}

export interface MigrationStage {
	title: string;
	count: number;
	steps: Array<{ label: string }>;
	type: "Manual" | "Automatic";
}

export interface CostDataPoint {
	name: string;
	actual: number;
	projected: number;
}

export interface FileTreeItemProps {
	node: FileTreeNode;
	depth: number;
	onFileClick?: (node: FileTreeNode) => void;
}

export const fileTreeData: FileTreeNode[] = [
	{
		id: "root-uk-grid-256",
		name: "uk_grid_workspace_256",
		type: "folder",
		count: 128,
		workflow: "Automatic",
		children: [
			{
				id: "folder-etl-pipeline",
				name: "etl_pipeline",
				link: "www.2345.com",
				type: "folder",
				count: 45,
				workflow: "Manual",
				children: [
					{
						id: "file-etl-001",
						name: "extract_data.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-etl-002",
						name: "transform_logic.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-etl-003",
						name: "load_target.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-etl-004",
						name: "error_handler.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
			{
				id: "folder-validation",
				name: "validation_rules",
				type: "folder",
				count: 38,
				workflow: "Automatic",
				children: [
					{
						id: "file-val-001",
						name: "schema_check.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-val-002",
						name: "data_quality.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-val-003",
						name: "boundary_test.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
			{
				id: "folder-reporting",
				name: "reporting_module",
				type: "folder",
				count: 45,
				workflow: "Manual",
				children: [
					{
						id: "file-rpt-001",
						name: "summary_report.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-rpt-002",
						name: "detail_export.sas",
						type: "file",
						workflow: "Manual",
					},
				],
			},
		],
	},
	{
		id: "root-uk-grid-259",
		name: "uk_grid_workspace_259",
		type: "folder",
		count: 96,
		workflow: "Manual",
		children: [
			{
				id: "folder-legacy-migration",
				name: "legacy_migration",
				type: "folder",
				count: 52,
				workflow: "Automatic",
				children: [
					{
						id: "file-leg-001",
						name: "code_converter.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-leg-002",
						name: "macro_adapter.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-leg-003",
						name: "libname_mapper.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
			{
				id: "folder-config-sync",
				name: "config_sync",
				type: "folder",
				count: 44,
				workflow: "Manual",
				children: [
					{
						id: "file-cfg-001",
						name: "env_variables.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-cfg-002",
						name: "connection_pool.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-cfg-003",
						name: "timeout_settings.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
		],
	},
	{
		id: "root-sas-dms",
		name: "sas_dms_integration",
		type: "folder",
		count: 64,
		workflow: "Automatic",
		children: [
			{
				id: "file-dms-001",
				name: "dms_connector.sas",
				type: "file",
				workflow: "Automatic",
			},
			{
				id: "file-dms-002",
				name: "sync_handler.sas",
				type: "file",
				workflow: "Manual",
			},
			{
				id: "file-dms-003",
				name: "metadata_parser.sas",
				type: "file",
				workflow: "Automatic",
			},
			{
				id: "file-dms-004",
				name: "audit_logger.sas",
				type: "file",
				workflow: "Manual",
			},
		],
	},
	{
		id: "root-analytics-core",
		name: "analytics_core_library",
		type: "folder",
		count: 215,
		workflow: "Automatic",
		children: [
			{
				id: "folder-statistical",
				name: "statistical_functions",
				type: "folder",
				count: 89,
				workflow: "Automatic",
				children: [
					{
						id: "file-stat-001",
						name: "regression_model.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-stat-002",
						name: "anova_test.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-stat-003",
						name: "time_series.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-stat-004",
						name: "clustering_algo.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
			{
				id: "folder-ml-ops",
				name: "ml_operations",
				type: "folder",
				count: 76,
				workflow: "Manual",
				children: [
					{
						id: "file-ml-001",
						name: "feature_engineering.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-ml-002",
						name: "model_training.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-ml-003",
						name: "hyperparameter_tune.sas",
						type: "file",
						workflow: "Manual",
					},
				],
			},
			{
				id: "folder-deployment",
				name: "deployment_scripts",
				type: "folder",
				count: 50,
				workflow: "Automatic",
				children: [
					{
						id: "file-dep-001",
						name: "prod_deploy.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-dep-002",
						name: "rollback_handler.sas",
						type: "file",
						workflow: "Manual",
					},
				],
			},
		],
	},
	{
		id: "root-data-governance",
		name: "data_governance_suite",
		type: "folder",
		count: 143,
		workflow: "Manual",
		children: [
			{
				id: "folder-compliance",
				name: "compliance_checks",
				type: "folder",
				count: 67,
				workflow: "Automatic",
				children: [
					{
						id: "file-comp-001",
						name: "gdpr_validator.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-comp-002",
						name: "pii_scanner.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-comp-003",
						name: "access_audit.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
			{
				id: "folder-lineage",
				name: "data_lineage",
				type: "folder",
				count: 76,
				workflow: "Manual",
				children: [
					{
						id: "file-lin-001",
						name: "source_tracker.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-lin-002",
						name: "impact_analyzer.sas",
						type: "file",
						workflow: "Manual",
					},
					{
						id: "file-lin-003",
						name: "dependency_graph.sas",
						type: "file",
						workflow: "Automatic",
					},
				],
			},
		],
	},
	{
		id: "root-utility-tools",
		name: "utility_tools",
		type: "folder",
		count: 32,
		workflow: "Automatic",
		children: [
			{
				id: "file-util-001",
				name: "log_parser.sas",
				type: "file",
				workflow: "Automatic",
			},
			{
				id: "file-util-002",
				name: "batch_runner.sas",
				type: "file",
				workflow: "Manual",
			},
			{
				id: "file-util-003",
				name: "config_loader.sas",
				type: "file",
				workflow: "Automatic",
			},
		],
	},
	{
		id: "root-test-suite",
		name: "test_automation_suite",
		type: "folder",
		count: 88,
		workflow: "Manual",
		children: [
			{
				id: "folder-unit-tests",
				name: "unit_tests",
				type: "folder",
				count: 45,
				workflow: "Automatic",
				children: [
					{
						id: "file-test-001",
						name: "mock_data_gen.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-test-002",
						name: "assertion_lib.sas",
						type: "file",
						workflow: "Manual",
					},
				],
			},
			{
				id: "folder-integration",
				name: "integration_tests",
				type: "folder",
				count: 43,
				workflow: "Manual",
				children: [
					{
						id: "file-int-001",
						name: "api_connector_test.sas",
						type: "file",
						workflow: "Automatic",
					},
					{
						id: "file-int-002",
						name: "end_to_end_flow.sas",
						type: "file",
						workflow: "Manual",
					},
				],
			},
		],
	},
];

export const migrationStages: MigrationStage[] = [
	{
		title: "Agentic Planning",
		count: 113789,
		steps: [
			{ label: "Scan & Interpretations" },
			{ label: "SVN Data & Dependence" },
			{ label: "Harmonize Attendance" },
		],
		type: "Automatic",
	},
	{
		title: "Analytic Migration Workflow",
		count: 8769,
		steps: [
			{ label: "Analysis" },
			{ label: "Conversation" },
			{ label: "Unit Test" },
		],
		type: "Automatic",
	},
	{
		title: "Hammer Integration Stage",
		count: 0,
		steps: [
			{ label: "Git Migration" },
			{ label: "Regression Test" },
			{ label: "Prod Primary String" },
			{ label: "Business" },
		],
		type: "Manual",
	},
	{
		title: "SAS and DMS",
		count: 0,
		steps: [{ label: "SAS Programmer" }, { label: "SAS Server Dess" }],
		type: "Manual",
	},
];

export const costData: CostDataPoint[] = [
	{ name: "Jan", actual: 45000, projected: 50000 },
	{ name: "Feb", actual: 44000, projected: 49000 },
	{ name: "Mar", actual: 43500, projected: 48000 },
	{ name: "Apr", actual: 42000, projected: 46000 },
	{ name: "May", actual: 36000, projected: 40000 },
	{ name: "Jun", actual: 40000, projected: 44000 },
	{ name: "Jul", actual: 46000, projected: 50000 },
	{ name: "Aug", actual: 44000, projected: 48000 },
	{ name: "Sep", actual: 38000, projected: 42000 },
	{ name: "Oct", actual: 35000, projected: 39000 },
	{ name: "Nov", actual: 42000, projected: 46000 },
	{ name: "Dec", actual: 44000, projected: 48000 },
];

export const dashboardMetrics = {
	totalLinesOfCode: 122558,
	workspaceCount: 47,
	costSavingsYTD: 187420,
	costPerLineOfCode: 0.0087,
	activeWorkspaces: 47,
	pendingWorkspaces: 12,
	industryBenchmarkCost: 0.012,
	growthRate: 2.4,
	savingsGrowthRate: 12.3,
};
